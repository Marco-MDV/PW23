import PercorsoTappe from "./PercorsoTappe"
export default function VrpBox({ data }) {
  return (
    <div className="w-full sm:w-1/2 min-w-0 border border-black/50 rounded-xl">
      <div className="flex justify-between text-xs bg-blue-100 rounded-t-xl p-1">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
            fill="none"
          >
            <path
              fill="none"
              stroke="#3e9ce5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M313.27 124.64L198.73 51.36a32 32 0 0 0-29.28.35L56.51 127.49A16 16 0 0 0 48 141.63v295.8a16 16 0 0 0 23.49 14.14l97.82-63.79a32 32 0 0 1 29.5-.24l111.86 73a32 32 0 0 0 29.27-.11l115.43-75.94a16 16 0 0 0 8.63-14.2V74.57a16 16 0 0 0-23.49-14.14l-98 63.86a32 32 0 0 1-29.24.35ZM328 128v336M184 48v336"
            />
          </svg>
          <p className="text-blue-800">VRP - Due veicoli</p>
        </div>
        <p className="text-white font px-3 py-1 bg-blue-700 w-fit rounded-xl ">
          {data.VRP.distanza_totale_km} km
        </p>
      </div>
      {/* blocco  1 */}
      <div className="text-xs flex pb-2 border-b border-black/50">
        <div className="p-1">
          <p className="py-1 px-2 bg-blue-800 text-white rounded-xl">1</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Furgone 1</p>
          <div className="w-full flex items-center justify-around pr-1 py-2">
            <PercorsoTappe percorso={data.VRP.furgoni.furgone1.percorso}/>
          </div>
          <p className="text-black/50">Carico: {data.VRP.furgoni.furgone1.carico_kg} kg</p>
        </div>
        <div className="w-full text-right pr-1 pt-1">
          <p>{data.VRP.furgoni.furgone1.distanza_km} km</p>
        </div>
      </div>
      {/* blocco 2 */}
      <div className="text-xs flex py-2">
        <div className="p-1">
          <p className="py-1 px-2 bg-orange-400 text-white rounded-xl">2</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Furgone 2</p>
          <div className="w-full flex items-center justify-around pr-1 py-2">
            <PercorsoTappe percorso={data.VRP.furgoni.furgone2.percorso}/>
          </div>
          <p className="text-black/50">Carico: {data.VRP.furgoni.furgone2.carico_kg} kg</p>
        </div>
        <div className="w-full text-right pr-1 pt-1">
          <p>{data.VRP.furgoni.furgone2.distanza_km} km</p>
        </div>
      </div>
    </div>
  );
}
