
"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

const formatoEuro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

export default function GraficoSensibilita({ data }) {
  const sensibilita = Array.isArray(data?.sensibilita)
    ? [...data.sensibilita].sort(
        (a, b) => a.costo_fisso_tsp_eur - b.costo_fisso_tsp_eur
      )
    : [];

  const costoFissoAttuale =
    data?.costi?.veicolo_unico?.costo_fisso_eur;

  return (
    <section className="mt-4 w-full min-w-0 max-w-full overflow-hidden rounded-xl border-2 border-black/50 bg-white p-3 sm:p-4">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-black">
          Grafico analisi di sensibilità
        </h2>

        <p className="text-xs sm:text-sm text-black/50">
          Confronto dei costi totali TSP e VRP al variare
          del costo fisso del veicolo unico.
        </p>
      </div>

      {sensibilita.length === 0 ? (
        <p role="status" className="py-8 text-center text-sm text-gray-500">
          Dati dell'analisi di sensibilità non disponibili.
        </p>
      ) : (
        <>
          <div className="h-75 w-full min-w-0 sm:h-95">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sensibilita}
                margin={{
                  top: 12,
                  right: 16,
                  left: 0,
                  bottom: 24,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />

                <XAxis
                  dataKey="costo_fisso_tsp_eur"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  tickCount={6}
                  tickFormatter={(value) => `€${value}`}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  label={{
                    value: "Costo fisso TSP (€)",
                    position: "insideBottom",
                    offset: -12,
                    fontSize: 11,
                  }}
                />

                <YAxis
                  width={55}
                  tickFormatter={(value) => `€${value}`}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                />

                <Tooltip
                  formatter={(value, name) => [
                    formatoEuro.format(Number(value)),
                    name,
                  ]}
                  labelFormatter={(value) =>
                    `Costo fisso TSP: ${formatoEuro.format(Number(value))}`
                  }
                  contentStyle={{
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />

                <Legend
                  verticalAlign="top"
                  height={36}
                />

                {Number.isFinite(costoFissoAttuale) && (
                  <ReferenceLine
                    x={costoFissoAttuale}
                    stroke="#94a3b8"
                    strokeDasharray="4 4"
                  />
                )}

                <Line
                  type="linear"
                  dataKey="costo_tsp_eur"
                  name="TSP - Veicolo unico"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />

                <Line
                  type="linear"
                  dataKey="costo_vrp_eur"
                  name="VRP - Due veicoli"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 rounded-lg bg-gray-100 p-3 text-xs sm:text-sm text-black/70">
            {Number.isFinite(costoFissoAttuale) && (
              <p className="mb-1">
                Costo fisso attuale TSP: 
                <strong>
                   {formatoEuro.format(costoFissoAttuale)} 
                </strong>
                 - indicato dalla linea verticale tratteggiata.
              </p>
            )}

            <p>
              L'analisi di sensibilità confronta i costi complessivi degli scenari TSP e VRP al variare del costo fisso del veicolo unico, mantenendo invariati gli altri parametri economici. L'intersezione delle curve identifica la soglia oltre la quale cambia lo scenario economicamente più conveniente.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
