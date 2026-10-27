import { useEffect, useState } from "react";
import BoxDataRow from "./BoxDataRow";

export default function RowUno({ TSP, VRP }) {
  const [peso, setPeso] = useState(0)
  const [destinazioni , setDestinazioni] = useState(0)
  useEffect(()=>{
    if (VRP.furgoni.furgone1.carico_kg + VRP.furgoni.furgone2.carico_kg == 900 && TSP.carico_kg === 900) {
      setPeso(900)
    }else{
      setPeso("match peso non esatto") 
    }

    let destinazioniTsp = 0
    let destinazioniVrp = 0

    TSP.percorso.map((nodo)=>{
      if (nodo != "D") {
        ++destinazioniTsp
      }
    })

    VRP.furgoni.furgone1.percorso.map((nodo)=>{
      if (nodo != "D") {
        ++destinazioniVrp
      }
    })

    VRP.furgoni.furgone2.percorso.map((nodo)=>{
      if (nodo != "D") {
        ++destinazioniVrp
      }
    })

    if (destinazioniTsp == destinazioniVrp) {
      setDestinazioni(destinazioniTsp)
    }else(
      setDestinazioni("match non esatto")
    )
  },[])

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <BoxDataRow
        title="Distanza totale TSP"
        value={`${TSP.distanza_totale_km} km`}
        subTitle="Veicolo unico"
        customBg="bg-[#d1e2f0]"
        svg={
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
        }
      />
      <BoxDataRow
        title="Distanza totale VRP"
        value={`${VRP.distanza_totale_km} km`}
        subTitle="Due veicoli"
        customBg="bg-[#d1e2f0]"
        svg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
            fill="#3e9ce5"
          >
            <path d="M80 352c0 19.198 13.864 24.531 26.667 36.271v38.396c0 11.729 9.599 21.334 21.333 21.334h21.333c11.734 0 21.334-9.604 21.334-21.334v-21.333h170.666v21.333c0 11.729 9.604 21.334 21.334 21.334H384c11.729 0 21.333-9.604 21.333-21.334v-38.396C418.136 376.531 432 370.136 432 352V148.334C432 73.667 349.864 64 256 64S80 73.667 80 148.334V352zm80 15.989c-18.136 0-32-13.864-32-32 0-18.135 13.864-32 32-32s32 13.865 32 32c0 18.136-13.864 32-32 32zm192 0c-18.136 0-32-13.864-32-32 0-18.135 13.864-32 32-32s32 13.865 32 32c0 18.136-13.864 32-32 32zm32-122.656H128V138.667h256v106.666z" />
          </svg>
        }
      />
      <BoxDataRow
        title="Domanda totale"
        value={peso}
        subTitle="Su 5 destinazioni"
        customBg="bg-[#d1f0e1]"
        svg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
          >
            <path
              d="M467.3 168.1c-1.8 0-3.5.3-5.1 1l-177.6 92.1h-.1c-7.6 4.7-12.5 12.5-12.5 21.4v185.9c0 6.4 5.6 11.5 12.7 11.5 2.2 0 4.3-.5 6.1-1.4.2-.1.4-.2.5-.3L466 385.6l.3-.1c8.2-4.5 13.7-12.7 13.7-22.1V179.6c0-6.4-5.7-11.5-12.7-11.5z"
              fill="#48ad7e"
            />
            <path
              d="M454.3 118.5L272.6 36.8S261.9 32 256 32c-5.9 0-16.5 4.8-16.5 4.8L57.6 118.5s-8 3.3-8 9.5c0 6.6 8.3 11.5 8.3 11.5l185.5 97.8c3.8 1.7 8.1 2.6 12.6 2.6 4.6 0 8.9-1 12.7-2.7l185.4-97.9s7.5-4 7.5-11.5c.1-6.3-7.3-9.3-7.3-9.3z"
              fill="#48ad7e"
            />
            <path
              d="M227.5 261.2L49.8 169c-1.5-.6-3.3-1-5.1-1-7 0-12.7 5.1-12.7 11.5v183.8c0 9.4 5.5 17.6 13.7 22.1l.2.1 174.7 92.7c1.9 1.1 4.2 1.7 6.6 1.7 7 0 12.7-5.2 12.7-11.5V282.6c.1-8.9-4.9-16.8-12.4-21.4z"
              fill="#48ad7e"
            />
          </svg>
        }
      />
      <BoxDataRow
        title="Numero destinazioni"
        value={destinazioni}
        subTitle="Clienti da servire"
        customBg="bg-[#d1f0e1]"
        svg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
          >
            <path
              d="M256 32c-79.529 0-144 64.471-144 144 0 112 144 304 144 304s144-192 144-304c0-79.529-64.471-144-144-144zm0 190.9c-25.9 0-46.9-21-46.9-46.9s21-46.9 46.9-46.9 46.9 21 46.9 46.9-21 46.9-46.9 46.9z"
              fill="#48ad7e"
            />
          </svg>
        }
      />
    </div>
  );
}
