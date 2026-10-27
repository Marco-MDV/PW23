import { useEffect, useState } from "react";

export default function TabellaConfronto({ data }) {
  const testa = [
    "Indicatore",
    "TSP - Veicolo unico",
    "VRP - Due veicoli",
    "Differenza",
  ];
  const [caricoComplessivoDueVeicoli, setCaricoComplessivoDueVeicoli]=useState(0)
  useEffect(()=>{
    if (data.VRP.furgoni.furgone1.carico_kg <= 500 && data.VRP.furgoni.furgone2.carico_kg <= 500) {
      setCaricoComplessivoDueVeicoli(1000)
    }else(
      setCaricoComplessivoDueVeicoli(`sovracarico dei veicoli: ${data.VRP.furgoni.furgone1.carico_kg+data.VRP.furgoni.furgone2.carico_kg}`)
    )
  },[])
  return (
    <div className=" border-2 border-black/50 flex flex-col justify-around items-left rounded-xl p-2">
      <div className="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 512 512"
          fill="none"
        >
          <path
            d="M320 32H192a32 32 0 0 0-32 32v412a4 4 0 0 0 4 4h184a4 4 0 0 0 4-4V64a32 32 0 0 0-32-32Zm144 160h-72a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8h80a24 24 0 0 0 24-24V224a32 32 0 0 0-32-32ZM48 128a32 32 0 0 0-32 32v296a24 24 0 0 0 24 24h80a8 8 0 0 0 8-8V136a8 8 0 0 0-8-8Z"
            fill="#48ad7e"
          />
        </svg>
        <p className="font-bold text-xl">Confronto scenari</p>
      </div>
      <div className="w-full min-w-0 overflow-x-auto rounded-xl border-2 border-black/50">
        <table className="w-full min-w-130 sm:min-w-0 border-collapse">
          <thead className="bg-black/10">
            <tr>
              {testa.map((titolo, i) => (
                <th
                  key={i}
                  className="text-xs text-left text-black/80 border-b border-r last:border-r-0 border-gray-300 px-2 py-4"
                >
                  {titolo}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-black/20 text-xs">
              <td className="border-r border-black/20 pl-1 py-4">
                Distanza totale
              </td>
              <td className="border-r border-black/20 font-bold px-2  py-1 text-center">
                <p className="bg-green-100 text-green-800 rounded-xl">
                  {data.TSP.distanza_totale_km} km
                </p>
              </td>
              <td className="border-r border-black/20 font-bold px-2  py-1 text-center">
                <p className="bg-blue-100 text-blue-800 rounded-xl">
                  {data.VRP.distanza_totale_km} km
                </p>
              </td>
              <td className="font-bold text-red-700 text-center">
                +
                {(
                  data.VRP.distanza_totale_km - data.TSP.distanza_totale_km
                ).toFixed(2)}{" "}
                km
              </td>
            </tr>
            <tr className="border-b border-black/20 text-xs">
              <td className="border-r border-black/20 pl-1 py-4">
                Numero di veicoli
              </td>
              <td className="border-r border-black/20 text-center">1</td>
              <td className="border-r border-black/20 text-center">2</td>
              <td className="text-red-700 text-center">+1</td>
            </tr>
            <tr className="border-b border-black/20 text-xs">
              <td className="border-r border-black/20 pl-1 py-4">
                Carico totale trasportato
              </td>
              <td className="border-r border-black/20 text-center">
                {data.TSP.carico_kg} kg
              </td>
              <td className="border-r border-black/20 text-center">
                {data.VRP.furgoni.furgone1.carico_kg +
                  data.VRP.furgoni.furgone2.carico_kg}{" "}
                kg
              </td>
              <td className="text-center">-</td>
            </tr>
            <tr className="text-xs">
              <td className="border-r border-black/20 pl-1 py-4">
                Capacità complessiva
              </td>
              <td className="border-r border-black/20 text-center">
                {data.TSP.capacita_kg} kg
              </td>
              <td className="border-r border-black/20 text-center">{caricoComplessivoDueVeicoli} kg</td>
              <td className="text-center">{data.TSP.capacita_kg - caricoComplessivoDueVeicoli} kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
