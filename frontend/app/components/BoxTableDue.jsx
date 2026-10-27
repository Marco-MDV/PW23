import TspBox from "./TspBox";
import TabellaConfronto from "./TabellaConfronto";
import VrpBox from "./VrpBox";
export default function BoxTableDue({ data }) {
  console.log(data);
  return (
    <>
      {/* blocco 1 */}
      <TabellaConfronto data={data} />

      {/* blocco 2 */}
      <div className="flex w-full min-w-0 items-center justify-center">
        <div className="flex w-full min-w-0 flex-col gap-4 rounded-xl border-2 border-black/50">
          <div className="flex gap-4 font-bold p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 512 512"
            >
              <path
                d="M256 32c-79.529 0-144 64.471-144 144 0 112 144 304 144 304s144-192 144-304c0-79.529-64.471-144-144-144zm0 190.9c-25.9 0-46.9-21-46.9-46.9s21-46.9 46.9-46.9 46.9 21 46.9 46.9-21 46.9-46.9 46.9z"
                fill="#48ad7e"
              />
            </svg>
            <p className="text-xl">Dettagli percorsi</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch gap-2 p-1 min-w-0">
            {/* TSP */}
            <TspBox data={data} />
            {/* VRP */}
            <VrpBox data={data} />
          </div>
        </div>
      </div>

      {/* blocco 3 */}
      <div className="flex w-full min-w-0 items-center justify-center">
        <div className="flex h-full w-full min-w-0 flex-col justify-between rounded-xl border-2 border-black/50 px-2 py-4">
          <div className="flex items-center gap-2">
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
            <p className="font-bold text-xl">Analisi sensibilità</p>
          </div>
          <div className="flex flex-col gap-4 h-full w-full justify-around">
            <div className=" flex gap-2 justify-content-between bg-gray-100 px-2 py-4 rounded-xl">
              <div className="bg-red-200 p-2 h-fit flex items-center justify-center rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    fill="#ef4444"
                    d="M7 12a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-5 .5A4.5 4.5 0 0 1 6.5 8h17a4.5 4.5 0 0 1 4.5 4.5v.5h.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5H28v.5a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 2 19.5zM6.5 10A2.5 2.5 0 0 0 4 12.5v7A2.5 2.5 0 0 0 6.5 22h17a2.5 2.5 0 0 0 2.5-2.5v-7a2.5 2.5 0 0 0-2.5-2.5z"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-black/50 text-xs">
                  Costo chilometrico:
                </p>
                <p className="text-sm">
                  TSP:
                  <span className="font-bold text-lg text-black ml-2">
                    € {(data.costi.veicolo_unico.costo_chilometrico_eur /
                        data.TSP.distanza_totale_km).toFixed(2)} / km
                  </span>
                </p>
                <p className="text-sm">
                  VRP:
                  <span className="font-bold text-lg text-black ml-2">
                    € {(data.costi.due_veicoli.costo_chilometrico_eur /
                        data.VRP.distanza_totale_km).toFixed(2)} / km 
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-gray-100 flex items-center min-w-0 py-4 px-2 gap-2 rounded-xl">
              <div className="bg-blue-200 h-fit p-2 flex items-center justify-center rounded-xl ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="#3b82f6"
                >
                  <path d="M6.75 3.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0ZM8 1a2.25 2.25 0 0 0-2.19 2.766l-1.612-.65a1.6 1.6 0 0 0-2.076.872a1.58 1.58 0 0 0 .87 2.07L5 6.869v2.384l-1.813 3.41a1.591 1.591 0 1 0 2.81 1.495L8 10.39l2.004 3.768a1.591 1.591 0 0 0 2.81-1.494L11 9.252V6.869l2.008-.811a1.58 1.58 0 0 0 .87-2.07a1.6 1.6 0 0 0-2.076-.873l-1.611.651A2.25 2.25 0 0 0 8 1ZM3.047 4.369a.6.6 0 0 1 .776-.327l3.428 1.385a2 2 0 0 0 1.498 0l3.428-1.385a.6.6 0 0 1 .776.327a.58.58 0 0 1-.32.762l-2.008.81A1 1 0 0 0 10 6.87v2.383a1 1 0 0 0 .117.47l1.814 3.411a.592.592 0 0 1-1.044.556L8.883 9.92a1 1 0 0 0-1.766 0l-2.003 3.767a.591.591 0 1 1-1.044-.555l1.813-3.41A1 1 0 0 0 6 9.253V6.869a1 1 0 0 0-.625-.927L3.367 5.13a.58.58 0 0 1-.32-.762Z" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-black/50 text-xs">
                Costo autisti TSP: <span className="font-bold text-base sm:text-xl text-black">€ {data.costi.veicolo_unico.costo_autisti_eur.toFixed(2)}</span>
                </p>
                <p className="text-black/50 text-xs">
                  Costo autisti VRP: <span className="font-bold text-base sm:text-xl text-black">€ {(data.costi.due_veicoli.costo_autisti_eur).toFixed(2)}</span>
                </p>
              </div>
            </div>
            <div className="bg-gray-100 flex rounded-xl px-2 py-4 gap-4">
              <div className="bg-green-300 h-fit rounded-xl p-2 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fill="#000000"
                    d="M11.5 1h-7A2.5 2.5 0 0 0 2 3.5v9A2.5 2.5 0 0 0 4.5 15h7a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 11.5 1Zm-6 2h5A1.5 1.5 0 0 1 12 4.5v1A1.5 1.5 0 0 1 10.5 7h-5A1.5 1.5 0 0 1 4 5.5v-1A1.5 1.5 0 0 1 5.5 3ZM6 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0 3a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm5-2a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm1 2a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-4-2a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm1 2a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
                  />
                </svg>
              </div>
                <div className="flex flex-row items-start gap-4 justify-between">
                  <p className="text-xs text-black/50">
                  Costo migliore stimato
                  <br />
                  Scenario migliore:
                  </p>
                  <p className="text-3xl font-bold text-green-900 text-center">
                    {data.costi.due_veicoli.costo_totale_eur > data.costi.veicolo_unico.costo_totale_eur? "TSP":"VRP"}
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
