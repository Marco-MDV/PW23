import json
import time
from pathlib import Path
from datetime import datetime, timezone
from urllib.parse import urlencode, quote
from urllib.request import Request, urlopen



with open("../../data/distanze.json", "r", encoding="utf-8") as file:
    dati = json.load(file)

nodi = dati["nodi"]

def calcola_distanza():
    for mittente in nodi:
        indirizzo = f"{mittente['indirizzo']}, {mittente['comune']}, Italia"

        url = "https://nominatim.openstreetmap.org/search?" + urlencode({
            "q": indirizzo,
            "format": "json",
            "limit": 1
        })

        time.sleep(1.1)

        req = Request(url, headers={"User-Agent": "PW23-Universita/1.0"})
        with urlopen(req) as risposta:
            risultati = json.load(risposta)

        if not risultati:
            raise ValueError(f"Indirizzo non trovato: {indirizzo}")

        latitudine_mittente = float(risultati[0]["lat"])
        longitudine_mittente = float(risultati[0]["lon"])


        for ricevente in nodi:
            indirizzo = f"{ricevente['indirizzo']}, {ricevente['comune']}, Italia"

            url = "https://nominatim.openstreetmap.org/search?" + urlencode({
                "q": indirizzo,
                "format": "json",
                "limit": 1
            })

            req = Request(url, headers={"User-Agent": "PW23-Universita/1.0"})
            with urlopen(req) as risposta:
                risultati = json.load(risposta)

            if not risultati:
                raise ValueError(f"Indirizzo non trovato: {indirizzo}")

            latitudine_ricevente = float(risultati[0]["lat"])
            longitudine_ricevente = float(risultati[0]["lon"])

            url = ("https://router.project-osrm.org/route/v1/driving/"f"{longitudine_mittente},{latitudine_mittente};{longitudine_ricevente},{latitudine_ricevente}"+"?overview=false")
        
            req = Request(url, headers={"User-Agent": "PW23-Universita/1.0"})

            with urlopen(req) as risposta:
                risultato = json.load(risposta)

            if risultato.get("code") != "Ok" or not risultato.get("routes"):
                raise ValueError("Percorso stradale non trovato")

            chilometri = risultato["routes"][0]["distance"] / 1000

            print(f"Punto A: {mittente['id']} - Punto B: {ricevente['id']} - {chilometri:.2f} km")

            dati["matrice_km"][mittente["id"]][ricevente["id"]] = round(chilometri, 2)

    with open("../../data/distanze.json", "w", encoding="utf-8") as file:
        json.dump(dati, file, indent=2, ensure_ascii=False)

    print("Matrice delle distanze aggiornata correttamente!")