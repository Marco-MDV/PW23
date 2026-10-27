import MappaPercorsi from "./MappaPercorsi";
export default function BoxTableUno({ data }) {
  const testa = ["Indicazione", "Tipologia", "Nome", "Comune", "Indirizzo"];
  const nodi = [
    {
      id: "D",
      tipologia: "Deposito",
      nome: "Velotto S.r.l.",
      comune: "Napoli",
      indirizzo: "Via Luigi Volpicella 214",
      bg: "bg-lime-600",
    },
    {
      id: "C1",
      tipologia: "Destinazione",
      nome: "Il Brigante Ilario Tutucci",
      comune: "Volla",
      indirizzo: "Via Monteoliveto 48",
      bg: "bg-red-600",
    },
    {
      id: "C2",
      tipologia: "Destinazione",
      nome: "Ristorante Del Pino",
      comune: "Cercola",
      indirizzo: "Via Don Minzoni 225",
      bg: "bg-blue-600",
    },
    {
      id: "C3",
      tipologia: "Destinazione",
      nome: "Pizzeria I Vesuviani",
      comune: "Casoria",
      indirizzo: "Strada Statale Sannitica 87",
      bg: "bg-lime-300",
    },
    {
      id: "C4",
      tipologia: "Destinazione",
      nome: "Conad City",
      comune: "San Giorgio a Cremano",
      indirizzo: "Via Luca Giordano 67/70",
      bg: "bg-purple-600",
    },
    {
      id: "C5",
      tipologia: "Destinazione",
      nome: "Euroesse Supermarket",
      comune: "Portici",
      indirizzo: "Via Benvenuto Cellini 19",
      bg: "bg-orange-600",
    },
  ];

  return (
    <>
      <div className="w-full min-w-0 max-w-full">
        <MappaPercorsi data={data} />
      </div>
      <div className="flex w-full min-w-0 max-w-full items-center justify-center">
        <div className="w-full min-w-0 max-w-full rounded-xl border-2 border-black/50 p-1">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 512 512"
              fill="#000000"
            >
              <path
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M96 256h320M96 176h320M96 336h320"
              />
            </svg>
            <p className="text-lg">Anagrafica nodi</p>
          </div>

          <div className="w-full min-w-0 overflow-x-auto rounded-xl border border-gray-300">
            <table className="w-full min-w-126.5 sm:min-w-0 border-collapse">
              <thead className="bg-black/10">
                <tr>
                  {testa.map((titolo, i) => (
                    <th
                      key={i}
                      className="text-xs text-left text-black/80 border-b border-r last:border-r-0 border-gray-300 px-2 py-3"
                    >
                      {titolo}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {nodi.map((nodo) => (
                  <tr
                    key={nodo.id}
                    className="text-xs border-b last:border-b-0 border-gray-300 hover:bg-gray-100"
                  >
                    <td className="border-r border-gray-300 px-2 py-2">
                      <p
                        className={`${nodo.bg} rounded p-1 text-white text-center`}
                      >
                        {nodo.id}
                      </p>
                    </td>
                    <td className="border-r border-gray-300 px-2 py-2">
                      {nodo.tipologia}
                    </td>
                    <td className="border-r border-gray-300 px-2 py-2">
                      {nodo.nome}
                    </td>
                    <td className="border-r border-gray-300 px-2 py-2">
                      {nodo.comune}
                    </td>
                    <td className="px-2 py-2">{nodo.indirizzo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
