
import { z } from "zod";

const numero = z.number().finite().nonnegative();

const percorso = z.array(z.string().min(1)).min(2).refine(
  (tappe) => tappe[0] === "D" && tappe.at(-1) === "D",
  { message: "Il percorso deve iniziare e terminare al deposito D" }
);

const coordinata = z.tuple([
  z.number().finite(),
  z.number().finite(),
]);

const geometria = z.object({
  type: z.literal("FeatureCollection"),
  features: z.array(
    z.object({
      type: z.literal("Feature"),
      properties: z.object({
        partenza: z.string().min(1),
      }),
      geometry: z.object({
        type: z.literal("LineString"),
        coordinates: z.array(coordinata).min(2),
      }),
    })
  ).min(1),
});

const furgone = z.object({
  carico_kg: numero,
  distanza_km: numero,
  percorso,
  geometria,
});

const costiScenario = z.object({
  costo_totale_eur: numero,
  costo_autisti_eur: numero,
  costo_chilometrico_eur: numero,
  costo_fisso_eur: numero,
});

const puntoSensibilita = z.object({
  costo_fisso_tsp_eur: numero,
  costo_tsp_eur: numero,
  costo_vrp_eur: numero,
  scenario_conveniente: z.enum(["TSP", "VRP", "Parità"]),
});

export const risultatiSchema = z.object({
  TSP: z.object({
    distanza_totale_km: numero,
    carico_kg: numero,
    capacita_kg: numero,
    percorso,
    geometria,
  }),

  VRP: z.object({
    distanza_totale_km: numero,
    furgoni: z.object({
      furgone1: furgone,
      furgone2: furgone,
    }),
  }),

  costi: z.object({
    veicolo_unico: costiScenario,
    due_veicoli: costiScenario,
  }),
  matrice_km: z.record(
    z.string(),
    z.record(z.string(), numero)
  ),
  sensibilita: z.array(puntoSensibilita).min(2),
}).passthrough().refine(
  (data) =>
    Math.abs(
      data.TSP.carico_kg -
      data.VRP.furgoni.furgone1.carico_kg -
      data.VRP.furgoni.furgone2.carico_kg
    ) < 0.001,
  {
    message: "Il carico totale TSP e VRP deve coincidere",
    path: ["VRP", "furgoni"],
  }
);
