"use client";

import dynamic from "next/dynamic";

const MappaLeaflet = dynamic(() => import("./MappaLeaflet"), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className="flex h-107.5 w-full animate-pulse items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500"
    >
      Caricamento mappa...
    </div>
  ),
});

export default function MappaPercorsi({ data }) {
  return <MappaLeaflet data={data} />;
}
