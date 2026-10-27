import PercorsoTappe  from "./PercorsoTappe"
export default function TspBox({ data }) {
  return (
    <div className="flex flex-col justify-between w-full sm:w-1/2 min-w-0 border border-black/50 rounded-xl">
      <div className="flex justify-between text-xs bg-green-100 rounded-t-xl p-1">
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
              stroke="#48ad7e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M313.27 124.64L198.73 51.36a32 32 0 0 0-29.28.35L56.51 127.49A16 16 0 0 0 48 141.63v295.8a16 16 0 0 0 23.49 14.14l97.82-63.79a32 32 0 0 1 29.5-.24l111.86 73a32 32 0 0 0 29.27-.11l115.43-75.94a16 16 0 0 0 8.63-14.2V74.57a16 16 0 0 0-23.49-14.14l-98 63.86a32 32 0 0 1-29.24.35ZM328 128v336M184 48v336"
            />
          </svg>
          <p className="text-green-800">TSP - Veicolo unico</p>
        </div>
        <p className="text-white font px-3 py-1 bg-green-700 w-fit rounded-xl ">
          {data.TSP.distanza_totale_km} km
        </p>
      </div>
      <div className="text-xs h-full flex flex-col justify-around">
        <p className="pl-1">percorso ottimale</p>
        <div className="flex w-full min-w-0 flex-wrap items-center justify-start gap-1 px-1 py-2">
          <PercorsoTappe percorso={data.TSP.percorso}/>
        </div>
      </div>
      <div className="border-t border-black/50 px-2 flex items-center ">
        <div className="border-r  w-1/2 text-xs">
          <p className="text-black/80">Carico trasportato</p>
          <p className="font-bold">{data.TSP.carico_kg} kg</p>
        </div>
        <div className="w-1/2 p-2 text-xs">
          <p className="text-black/80">Capacità veicolo</p>
          <p className="font-bold">{data.TSP.capacita_kg} kg</p>
        </div>
      </div>
    </div>
  );
}
