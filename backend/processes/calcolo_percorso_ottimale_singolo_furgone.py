from .lettura_json import lettura_json
from itertools import permutations

def percorso_ottimane_singolo_furgone():
    distanze = lettura_json("distanze.json")
    parametri = lettura_json("parametri.json")
    
    matrice = distanze["matrice_km"]
    clienti = [nodo["id"] for nodo in distanze["nodi"] if nodo["id"] != "D"]
    domanda = parametri["domanda_kg"]
    peso_totale = parametri["domanda_totale_kg"]
    capacita = parametri["scenari"]["veicolo_unico"]["capacita_per_veicolo_kg"]


    distanza_minima = float("inf")
    percorso_migliore = None

    if sum(domanda.values())!=peso_totale:
        raise ValueError("Il peso totale non corrisponde alla somma degli ordini!")
    
    if peso_totale > capacita:
        raise ValueError("Capacità del furgone insufficiente!")

    for combinazione in permutations(clienti):
        percorso=["D", *combinazione, "D"]
        distanza_totale=0

        for i in range(len(percorso)-1):
            start = percorso[i]
            stop = percorso[i + 1]

            distanza_totale += matrice[start][stop]

        if distanza_totale < distanza_minima:
            distanza_minima = distanza_totale
            percorso_migliore = percorso

    return {
        "scenario": "veicolo_unico",
        "percorso": percorso_migliore,
        "distanza_totale_km": round(distanza_minima, 2),
        "carico_kg": peso_totale,
        "capacita_kg": capacita
    }
