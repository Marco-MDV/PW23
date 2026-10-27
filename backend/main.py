from processes.calcolo_percorso_ottimale_doppio_furgone import percorso_ottimale_doppio_furgone
from processes.calcolo_percorso_ottimale_singolo_furgone import percorso_ottimane_singolo_furgone
from processes.calcolo_costi import calcolo_costi
from processes.analisi_sensibilita import analisi_sensibilita
from processes.geometria_percorso import geometria_percorso
from processes.lettura_json import lettura_json

def main():
    tsp = percorso_ottimane_singolo_furgone()
    vrp = percorso_ottimale_doppio_furgone()

    costi = calcolo_costi(tsp, vrp)
    sensibilita = analisi_sensibilita(costi)

    distanze = lettura_json("distanze.json")
    parametri = lettura_json("parametri.json")
    destinatari = lettura_json("destinatari.json")
    geometrie = distanze["geometrie_stradali"]

    tsp["geometria"] = geometria_percorso(
        tsp["percorso"],
        geometrie
    )

    for furgone in vrp["furgoni"].values():
        furgone["geometria"] = geometria_percorso(
            furgone["percorso"],
            geometrie
        )

    
    return {
        "TSP": tsp,
        "VRP": vrp,
        "costi": costi,
        "sensibilita": sensibilita,
        "matrice_km": distanze["matrice_km"],

        "contesto": {
            "deposito": next(
                nodo
                for nodo in distanze["nodi"]
                if nodo["id"] == "D"
            ),
            "destinatari": destinatari["destinatari"],
            "domanda_kg": parametri["domanda_kg"],
            "domanda_totale_kg": parametri["domanda_totale_kg"],
            "scenari": parametri["scenari"],
            "metadati_distanze": distanze.get("metadati", {}),
        },
    }
