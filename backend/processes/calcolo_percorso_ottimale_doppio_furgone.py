from .calcola_percorso_gruppo import calcola_percorso_gruppo
from .lettura_json import lettura_json
from itertools import combinations

def percorso_ottimale_doppio_furgone():

    distanze = lettura_json("distanze.json")
    parametri = lettura_json("parametri.json") 

    matrice = distanze["matrice_km"]
    clienti = [nodo["id"] for nodo in distanze["nodi"] if nodo["id"] != "D"]
    domanda = parametri["domanda_kg"]
    peso_totale = parametri["domanda_totale_kg"]
    capacita = parametri["scenari"]["due_veicoli"]["capacita_per_veicolo_kg"]
    numero_veicoli = parametri["scenari"]["due_veicoli"]["numero_veicoli"]

    distanza_minima = float("inf")
    percorso_migliore = None

    if numero_veicoli != 2:
        raise ValueError("Questo algoritmo richiede esattamente due furgoni!")

    if sum(domanda.values()) != peso_totale:
        raise ValueError("Il peso totale non corrisponde alla somma degli ordini!")

    if peso_totale > capacita * numero_veicoli:
        raise ValueError("Capacità dei furgoni è insufficiente!")

    if any(peso>capacita for peso in domanda.values()):
        raise ValueError("Un cliente richiede più merce della capacità di un furgone!")

    for quantita in range(1, len(clienti)):
        for gruppo1 in combinations(clienti, quantita):
            gruppo2 = [c for c in clienti if c not in gruppo1]

            peso1 = sum(domanda[c] for c in gruppo1)
            peso2 = sum(domanda[c] for c in gruppo2)

            if peso1 > capacita or peso2 > capacita:
                continue

            percorso1, distanza1 = calcola_percorso_gruppo(gruppo1, matrice)
            percorso2, distanza2 = calcola_percorso_gruppo(gruppo2, matrice)

            distanza_totale = distanza1 + distanza2

            if distanza_totale < distanza_minima:
                distanza_minima = distanza_totale
                percorso_migliore = {
                    "furgone1": {
                        "percorso": percorso1,
                        "distanza_km": distanza1,
                        "carico_kg": peso1
                    },
                    "furgone2": {
                        "percorso": percorso2,
                        "distanza_km": distanza2,
                        "carico_kg": peso2
                    }
                }

    if percorso_migliore is None:
        raise ValueError("Nessuna ripartizione valida trovata!")

    return {
        "scenario": "due_veicoli",
        "distanza_totale_km": round(distanza_minima, 2),
        "furgoni": percorso_migliore
    }            
