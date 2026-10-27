"use client";

import { useId } from "react";

const formatKm = new Intl.NumberFormat("it-IT", {
  maximumFractionDigits: 2,
});

const colori = {
  tsp: "#059669",
  furgone1: "#2563eb",
  furgone2: "#ea580c",
};

function DiagrammaGrafo({
  titolo,
  distanzaTotale,
  nodi,
  percorsi,
  matrice,
}) {
  const svgId = useId().replace(/:/g, "");

  const posizioni = Object.fromEntries(
    nodi.map((id, indice) => {
      const angolo =
        -Math.PI / 2 + (2 * Math.PI * indice) / nodi.length;

      return [
        id,
        {
          x: 320 + Math.cos(angolo) * 205,
          y: 210 + Math.sin(angolo) * 135,
        },
      ];
    })
  );

  const archi = percorsi.flatMap((percorso) =>
    percorso.tappe.slice(0, -1).map((partenza, i) => {
      const arrivo = percorso.tappe[i + 1];
      const a = posizioni[partenza];
      const b = posizioni[arrivo];

      if (!a || !b) return null;

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const lunghezza = Math.hypot(dx, dy);

      if (lunghezza === 0) return null;

      const ux = dx / lunghezza;
      const uy = dy / lunghezza;

      const x1 = a.x + ux * 26;
      const y1 = a.y + uy * 26;
      const x2 = b.x - ux * 28;
      const y2 = b.y - uy * 28;

      const centroX = (x1 + x2) / 2;
      const centroY = (y1 + y2) / 2;

      const etichettaX = centroX - uy * 19;
      const etichettaY = centroY + ux * 19;

      const distanza = matrice?.[partenza]?.[arrivo];

      return {
        id: `${percorso.id}-${i}`,
        partenza,
        arrivo,
        colore: percorso.colore,
        stile: percorso.stile,
        x1,
        y1,
        x2,
        y2,
        etichettaX,
        etichettaY,
        distanza,
        markerId: `${svgId}-${percorso.id}`,
      };
    }).filter(Boolean)
  );

  const distanzeComplete = archi.every(
    (arco) => Number.isFinite(arco.distanza)
  );

  return (
    <article className="w-full min-w-0 rounded-xl border border-black/20 bg-gray-50 p-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-bold text-base sm:text-lg">
          {titolo}
        </h3>

        <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-black shadow-sm">
          {formatKm.format(distanzaTotale)} km
        </span>
      </div>

      <div className="w-full min-w-0 overflow-x-auto rounded-lg bg-white">
        <svg
          viewBox="0 0 640 420"
          className="block h-auto w-full min-w-117.5"
          role="img"
          aria-label={`Grafo orientato dello scenario ${titolo}`}
        >
          <defs>
            {percorsi.map((percorso) => (
              <marker
                key={percorso.id}
                id={`${svgId}-${percorso.id}`}
                markerWidth="10"
                markerHeight="10"
                refX="7"
                refY="5"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path
                  d="M1 1 L9 5 L1 9 Z"
                  fill={percorso.colore}
                />
              </marker>
            ))}
          </defs>

          {archi.map((arco) => (
            <g key={arco.id}>
              <line
                x1={arco.x1}
                y1={arco.y1}
                x2={arco.x2}
                y2={arco.y2}
                stroke={arco.colore}
                strokeWidth="3"
                strokeDasharray={
                  arco.stile === "tratteggiato"
                    ? "8 5"
                    : undefined
                }
                markerEnd={`url(#${arco.markerId})`}
              >
                <title>
                  {`${arco.partenza} → ${arco.arrivo}${
                    Number.isFinite(arco.distanza)
                      ? `: ${formatKm.format(arco.distanza)} km`
                      : ""
                  }`}
                </title>
              </line>

              {Number.isFinite(arco.distanza) && (
                <g>
                  <rect
                    x={arco.etichettaX - 28}
                    y={arco.etichettaY - 11}
                    width="56"
                    height="22"
                    rx="5"
                    fill="white"
                    stroke="#cbd5e1"
                  />

                  <text
                    x={arco.etichettaX}
                    y={arco.etichettaY + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="#334155"
                  >
                    {formatKm.format(arco.distanza)} km
                  </text>
                </g>
              )}
            </g>
          ))}

          {nodi.map((id) => {
            const posizione = posizioni[id];

            return (
              <g key={id}>
                <circle
                  cx={posizione.x}
                  cy={posizione.y}
                  r="23"
                  fill={id === "D" ? "#047857" : "#ffffff"}
                  stroke="#334155"
                  strokeWidth="2"
                />

                <text
                  x={posizione.x}
                  y={posizione.y + 5}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill={id === "D" ? "#ffffff" : "#0f172a"}
                >
                  {id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-700">
        {percorsi.map((percorso) => (
          <div
            key={percorso.id}
            className="flex items-center gap-2"
          >
            <span
              className="inline-block h-0.75 w-6"
              style={{
                backgroundColor: percorso.colore,
              }}
            />
            <span>{percorso.nome}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function GrafoPercorsi({ data }) {
  const tsp = data.TSP;
  const vrp = data.VRP;

  const nodi = [...new Set(tsp.percorso)];

  const matrice = data.matrice_km;

  const percorsiTsp = [
    {
      id: "tsp",
      nome: "Veicolo unico",
      colore: colori.tsp,
      stile: "continuo",
      tappe: tsp.percorso,
    },
  ];

  const percorsiVrp = [
    {
      id: "furgone1",
      nome: "Furgone 1",
      colore: colori.furgone1,
      stile: "continuo",
      tappe: vrp.furgoni.furgone1.percorso,
    },
    {
      id: "furgone2",
      nome: "Furgone 2",
      colore: colori.furgone2,
      stile: "tratteggiato",
      tappe: vrp.furgoni.furgone2.percorso,
    },
  ];

  return (
    <section className="mt-4 w-full min-w-0 max-w-full overflow-hidden rounded-xl border-2 border-black/50 bg-white p-3 sm:p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-black">
          Grafo delle soluzioni ottime
        </h2>

        <p className="mt-1 text-sm text-black/50">
          Rappresentazione dei nodi e degli archi percorsi
          nelle soluzioni TSP e VRP.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DiagrammaGrafo
          titolo="TSP - Veicolo unico"
          distanzaTotale={tsp.distanza_totale_km}
          nodi={nodi}
          percorsi={percorsiTsp}
          matrice={matrice}
        />

        <DiagrammaGrafo
          titolo="VRP - Due veicoli"
          distanzaTotale={vrp.distanza_totale_km}
          nodi={nodi}
          percorsi={percorsiVrp}
          matrice={matrice}
        />
      </div>

      <p className="mt-4 text-xs text-gray-500">
        D = deposito; C1–C5 = clienti. <br /> Le frecce indicano
        il verso di percorrenza e i valori sugli archi
        indicano le distanze stradali in chilometri.
        La posizione dei nodi è schematica e non corrisponde
        alle coordinate geografiche.
      </p>
    </section>
  );
}
