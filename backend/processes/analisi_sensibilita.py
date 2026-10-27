from .lettura_json import lettura_json

def analisi_sensibilita(costi):
    parametri = lettura_json("parametri.json")
    configurazione = parametri["analisi_sensibilita"]
    valori = configurazione["valori_eur"]
    tsp = costi["veicolo_unico"]
    vrp = costi["due_veicoli"]
    costi_variabili_tsp = (tsp["costo_chilometrico_eur"] + tsp["costo_autisti_eur"])
    risultati = []

    for costo_fisso in valori:
        costo_tsp = round(costo_fisso + costi_variabili_tsp, 2)
        costo_vrp = vrp["costo_totale_eur"]

        if costo_tsp < costo_vrp:
            conveniente = "TSP"
        elif costo_vrp < costo_tsp:
            conveniente = "VRP"
        else:
            conveniente = "Parità"

        risultati.append({
            "costo_fisso_tsp_eur": costo_fisso,
            "costo_tsp_eur": costo_tsp,
            "costo_vrp_eur": costo_vrp,
            "scenario_conveniente": conveniente
        })

    return risultati