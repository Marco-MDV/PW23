"use client";

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

const numero = new Intl.NumberFormat("it-IT", {
  maximumFractionDigits: 2,
});

function CardScenario({ titolo, scenario, colore }) {
  if (!scenario) return null;

  const totaleCapacita =
    scenario.numero_veicoli *
    scenario.capacita_per_veicolo_kg;

  const totaleFisso =
    scenario.numero_veicoli *
    scenario.costo_fisso_per_veicolo_eur;

  return (
    <div className="min-w-0 rounded-xl border border-black/15 bg-gray-50 p-3">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: colore }}
        />

        <h4 className="font-bold text-sm">{titolo}</h4>
      </div>

      <dl className="space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-black/60">Numero veicoli</dt>
          <dd className="font-semibold">
            {scenario.numero_veicoli}
          </dd>
        </div>

        <div className="flex justify-between gap-3">
          <dt className="text-black/60">Capacità per veicolo</dt>
          <dd className="font-semibold">
            {numero.format(
              scenario.capacita_per_veicolo_kg
            )} kg
          </dd>
        </div>

        <div className="flex justify-between gap-3">
          <dt className="text-black/60">Capacità complessiva</dt>
          <dd className="font-semibold">
            {numero.format(totaleCapacita)} kg
          </dd>
        </div>

        <div className="border-t border-black/10 pt-2 flex justify-between gap-3">
          <dt className="text-black/60">Costo fisso per veicolo</dt>
          <dd className="font-semibold">
            {euro.format(
              scenario.costo_fisso_per_veicolo_eur
            )}
          </dd>
        </div>

        <div className="flex justify-between gap-3">
          <dt className="text-black/60">Costo fisso totale</dt>
          <dd className="font-semibold">
            {euro.format(totaleFisso)}
          </dd>
        </div>

        <div className="flex justify-between gap-3">
          <dt className="text-black/60">Tariffa chilometrica</dt>
          <dd className="font-semibold">
            {euro.format(scenario.costo_per_km_eur)}/km
          </dd>
        </div>

        <div className="flex justify-between gap-3">
          <dt className="text-black/60">Tariffa oraria per autista</dt>
          <dd className="font-semibold">
            {euro.format(
              scenario.costo_orario_autista_eur
            )}/h
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default function ContestoLogistico({ data }) {
  const contesto = data?.contesto;

  if (!contesto) {
    return (
      <section className="mt-4 w-full rounded-xl border-2 border-black/50 p-4">
        <h2 className="text-xl font-bold">
          Contesto e dati dell'istanza logistica
        </h2>
        <p className="mt-2 text-sm text-black/60">
          Dati del contesto non disponibili nella risposta API.
        </p>
      </section>
    );
  }

  const {
    deposito,
    destinatari = [],
    domanda_kg: domanda = {},
    domanda_totale_kg: totaleDomanda,
    scenari,
    metadati_distanze: metadati = {},
  } = contesto;

  const fonte = metadati.fonte ?? metadati.fonte_prevista;
  const etichettaFonte = metadati.fonte ? "Fonte delle distanze" : "Fonte cartografica prevista";

  return (
    <section className="mt-4 w-full min-w-0 max-w-full overflow-hidden rounded-xl border-2 border-black/50 bg-white p-3 text-black sm:p-4">
      <header className="mb-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-1.5 rounded-full bg-emerald-600" />

          <h2 className="text-lg font-bold sm:text-xl">
            Contesto e dati dell'istanza logistica
          </h2>
        </div>

        <p className="mt-1 text-xs text-black/50 sm:text-sm">
          Informazioni sull'impresa, sui destinatari e sui
          parametri utilizzati nella simulazione TSP e VRP.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <article className="min-w-0 rounded-xl bg-gray-100 p-4">
          <h3 className="mb-2 font-bold">
            Impresa di riferimento
          </h3>

          <p className="text-lg font-bold text-emerald-800">
            {deposito?.nome ?? "Velotto S.r.l."}
          </p>

          <p className="mt-2 text-sm leading-relaxed text-black/70">
            Impresa operante nel commercio all'ingrosso
            di frutta e ortaggi freschi, selezionata come
            riferimento per lo studio della distribuzione
            agroalimentare nell'area di Napoli.
          </p>

          <div className="mt-4 border-t border-black/10 pt-3">
            <p className="text-xs text-black/50">
              Deposito assunto nel modello — Nodo D
            </p>

            <p className="mt-1 text-sm font-semibold">
              {deposito?.indirizzo ?? "Non indicato"}
              {deposito?.comune ? `, ${deposito.comune}` : ""}
            </p>
          </div>
        </article>

        <article className="min-w-0 rounded-xl bg-gray-100 p-4">
          <h3 className="mb-3 font-bold">
            Caratteristiche del caso di studio
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white p-3">
              <p className="text-xs text-black/50">
                Destinatari
              </p>
              <p className="text-2xl font-bold">
                {destinatari.length}
              </p>
            </div>

            <div className="rounded-lg bg-white p-3">
              <p className="text-xs text-black/50">
                Domanda complessiva
              </p>
              <p className="text-2xl font-bold">
                {numero.format(totaleDomanda)} kg
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-black/70">
            L'istanza confronta una distribuzione con
            un unico veicolo (TSP) e una con due veicoli
            di capacità inferiore (VRP).
            I percorsi partono dal deposito e vi ritornano.
          </p>
        </article>
      </div>

      <article className="mt-4 min-w-0 rounded-xl border border-black/20 p-3 sm:p-4">
        <div className="mb-3">
          <h3 className="font-bold text-base sm:text-lg">
            Quantità da consegnare per destinatario
          </h3>
          <p className="text-xs text-black/50">
            Ordini ipotetici utilizzati nella simulazione.
          </p>
        </div>

        <div className="w-full min-w-0 overflow-x-auto rounded-lg border border-black/10">
          <table className="w-full min-w-122.5 border-collapse text-sm">
            <caption className="sr-only">
              Quantità simulate per ciascun cliente
            </caption>

            <thead className="bg-gray-100 text-left text-xs">
              <tr>
                <th className="px-3 py-3">Nodo</th>
                <th className="px-3 py-3">Destinatario</th>
                <th className="px-3 py-3">Comune</th>
                <th className="px-3 py-3 text-right">
                  Quantità
                </th>
              </tr>
            </thead>

            <tbody>
              {destinatari.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="border-t border-black/10"
                >
                  <td className="px-3 py-3 font-bold text-emerald-800">
                    {cliente.id}
                  </td>

                  <td className="px-3 py-3">
                    <p className="font-medium">
                      {cliente.nome}
                    </p>
                    <p className="text-xs text-black/50">
                      {cliente.tipologia}
                    </p>
                  </td>

                  <td className="px-3 py-3 text-black/70">
                    {cliente.comune}
                  </td>

                  <td className="px-3 py-3 text-right font-bold">
                    {Number.isFinite(domanda[cliente.id]) ? `${numero.format(domanda[cliente.id])} kg` : "Non disponibile"}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="border-t-2 border-black/20 bg-emerald-50">
              <tr>
                <th colSpan={3} className="px-3 py-3 text-left">
                  Domanda totale
                </th>

                <td className="px-3 py-3 text-right font-bold text-emerald-800">
                  {numero.format(totaleDomanda)} kg
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </article>

      <article className="mt-4 min-w-0 rounded-xl border border-black/20 p-3 sm:p-4">
        <div className="mb-3">
          <h3 className="font-bold text-base sm:text-lg">
            Parametri del modello
          </h3>

          <p className="text-xs text-black/50">
            Capacità e tariffe utilizzate dal backend Python.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <CardScenario
            titolo="TSP — Veicolo unico"
            scenario={scenari?.veicolo_unico}
            colore="#059669"
          />

          <CardScenario
            titolo="VRP — Due veicoli"
            scenario={scenari?.due_veicoli}
            colore="#2563eb"
          />
        </div>
      </article>

      <article className="mt-4 rounded-xl bg-gray-100 p-4">
        <h3 className="mb-3 font-bold">
          Provenienza e natura dei dati
        </h3>

        <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-black/50">
              {etichettaFonte}
            </dt>
            <dd className="mt-1 font-semibold">
              {fonte ?? "Non documentata"}
            </dd>
          </div>

          <div>
            <dt className="text-xs text-black/50">
              Metodo di misurazione
            </dt>
            <dd className="mt-1 font-semibold">
              {metadati.criterio ?? "Non documentato"}
            </dd>
          </div>

          <div>
            <dt className="text-xs text-black/50">
              Tipologia della rete
            </dt>
            <dd className="mt-1 font-semibold">
              {metadati.direzionale ? "Stradale direzionale (andata e ritorno distinti)" : "Rete stradale"}
            </dd>
          </div>

          <div>
            <dt className="text-xs text-black/50">
              Data rilevazione
            </dt>
            <dd className="mt-1 font-semibold">
              {metadati.data_rilevazione ?? "Non indicata nel dataset"}
            </dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
