"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Popup,
  Tooltip,
} from "react-leaflet";

const nomiNodi = {
  D: "Velotto S.r.l.",
  C1: "Il Brigante Ilario Tutucci",
  C2: "Ristorante Del Pino",
  C3: "Pizzeria I Vesuviani",
  C4: "Conad City",
  C5: "Euroesse Supermarket",
};

export default function MappaLeaflet({ data }) {
  const [visualizzazione, setVisualizzazione] = useState("tutti");
  const [tileLoading, setTileLoading] = useState(true);
  const [tileError, setTileError] = useState(false);

  const tsp = data.TSP.geometria;
  const vrp1 = data.VRP.furgoni.furgone1.geometria;
  const vrp2 = data.VRP.furgoni.furgone2.geometria;

  const punti = Object.fromEntries(
    tsp.features.map((feature) => [
      feature.properties.partenza,
      feature.geometry.coordinates[0],
    ]),
  );

  const bounds = tsp.features.flatMap((feature) =>
    feature.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
  );

  return (
    <div className="w-full min-w-0 rounded-xl border-2 border-black/50 bg-white p-3 sm:p-4">
      <h2 className="mb-3 text-xl font-semibold">Mappa dei percorsi</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { id: "tutti", label: "Tutti" },
          { id: "tsp", label: "Solo TSP" },
          { id: "vrp", label: "Solo VRP" },
        ].map((opzione) => (
          <button
            key={opzione.id}
            onClick={() => setVisualizzazione(opzione.id)}
            className={`rounded-lg px-4 py-2 text-sm ${
              visualizzazione === opzione.id
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {opzione.label}
          </button>
        ))}
      </div>

      <div className="relative z-0 w-full min-w-0 overflow-hidden rounded-lg">
        <MapContainer
          bounds={bounds}
          boundsOptions={{ padding: [25, 25] }}
          scrollWheelZoom={false}
          style={{ height: "430px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            eventHandlers={{
              loading: () => {
                setTileLoading(true);
                setTileError(false);
              },
              load: () => {
                setTileLoading(false);
              },
              tileerror: () => {
                setTileError(true);
              },
            }}
          />

          {(visualizzazione === "tutti" || visualizzazione === "tsp") && (
            <GeoJSON
              key="tsp"
              data={tsp}
              style={{
                color: "#059669",
                weight: 5,
                opacity: 0.9,
              }}
            />
          )}

          {(visualizzazione === "tutti" || visualizzazione === "vrp") && (
            <>
              <GeoJSON
                key="vrp1"
                data={vrp1}
                style={{
                  color: "#2563eb",
                  weight: 4,
                  dashArray: "8 7",
                }}
              />

              <GeoJSON
                key="vrp2"
                data={vrp2}
                style={{
                  color: "#f97316",
                  weight: 4,
                  dashArray: "8 7",
                }}
              />
            </>
          )}

          {Object.entries(punti).map(([id, [lon, lat]]) => (
            <CircleMarker
              key={id}
              center={[lat, lon]}
              radius={7}
              pathOptions={{
                color: "#0f172a",
                fillColor: id === "D" ? "#0f766e" : "#ffffff",
                fillOpacity: 1,
                weight: 2,
              }}
            >
              <Tooltip permanent direction="top">
                {id}
              </Tooltip>

              <Popup>
                <strong>{id}</strong>
                <p>{nomiNodi[id]}</p>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {tileLoading && !tileError && (
          <div
            role="status"
            className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-white/70"
          >
            <p className="text-sm text-gray-600">Caricamento cartografia...</p>
          </div>
        )}
        {tileError && (
          <div
            role="alert"
            className="absolute bottom-2 left-2 right-2 z-50 rounded-lg bg-red-50 p-3 text-xs text-red-700 shadow"
          >
            Alcune parti della cartografia non sono disponibili. Verifica la
            connessione.
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <span className="text-emerald-700">● TSP</span>
        <span className="text-blue-600">● VRP Furgone 1</span>
        <span className="text-orange-600">● VRP Furgone 2</span>
      </div>
    </div>
  );
}
