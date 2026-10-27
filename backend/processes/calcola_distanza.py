import json
import time
from pathlib import Path
from datetime import datetime, timezone
from urllib.parse import urlencode, quote
from urllib.request import Request, urlopen
from .lettura_json import lettura_json
from .scrittura_json import scrittura_json


def calcola_distanza():
    
    dati = lettura_json("distanze.json")

    nodi = dati["nodi"]

    for mittente in nodi:
        indirizzo = f"{mittente['indirizzo']}, {mittente['comune']}, Italia"

        url = "https://nominatim.openstreetmap.org/search?" + urlencode({
            "q": indirizzo,
            "format": "json",
            "limit": 1
        })

        time.sleep(2)

        req = Request(url, headers={"User-Agent": "PW23-Universita/1.0"})
        with urlopen(req) as risposta:
            risultati = json.load(risposta)

        if not risultati:
            raise ValueError(f"Indirizzo non trovato: {indirizzo}")

        latitudine_mittente = float(risultati[0]["lat"])
        longitudine_mittente = float(risultati[0]["lon"])


        for ricevente in nodi:
            if mittente["id"] == ricevente["id"]:
                dati["matrice_km"][mittente["id"]][ricevente["id"]] = 0.0
                continue
            indirizzo = f"{ricevente['indirizzo']}, {ricevente['comune']}, Italia"

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

            latitudine_ricevente = float(risultati[0]["lat"])
            longitudine_ricevente = float(risultati[0]["lon"])

            url = ("https://router.project-osrm.org/route/v1/driving/"f"{longitudine_mittente},{latitudine_mittente};{longitudine_ricevente},{latitudine_ricevente}"+"?overview=full&geometries=geojson")
            
            req = Request(url, headers={"User-Agent": "PW23-Universita/1.0"})

            with urlopen(req) as risposta:
                risultato = json.load(risposta)

            if risultato.get("code") != "Ok" or not risultato.get("routes"):
                raise ValueError("Percorso stradale non trovato")

            chilometri = risultato["routes"][0]["distance"] / 1000

            dati.setdefault("geometrie_stradali", {}).setdefault(mittente["id"], {})[ricevente["id"]] = risultato["routes"][0]["geometry"]

            dati.setdefault("coordinate_nodi", {})[mittente["id"]] = [longitudine_mittente, latitudine_mittente]

            print(f"Punto A: {mittente['id']} - Punto B: {ricevente['id']} - {chilometri:.2f} km")

            dati["matrice_km"][mittente["id"]][ricevente["id"]] = round(chilometri, 2)

    scrittura_json("distanze.json", dati)
    print("Matrice delle distanze aggiornata correttamente!")
