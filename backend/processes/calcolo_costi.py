from .lettura_json import lettura_json 

def calcolo_costi(TSP, VRP):
    parametri = lettura_json("parametri.json")

    velocita = parametri["tempi"]["velocita_media_kmh"]
    tempi_scarico = parametri["tempi"]["scarico_minuti"]

    ore_scarico = sum(tempi_scarico.values()) / 60

    risultati={}

    for soluzione in (TSP, VRP):
        scenario = soluzione["scenario"]
        configurazione = parametri["scenari"][scenario]
        distanza = soluzione["distanza_totale_km"]
        costo_fisso = (configurazione["costo_fisso_per_veicolo_eur"] * configurazione["numero_veicoli"])
        costo_chilometrico = (distanza * configurazione["costo_per_km_eur"])
        ore_guida = distanza / velocita

        costo_autisti = ((ore_guida + ore_scarico) * configurazione["costo_orario_autista_eur"])

        costo_totale = costo_fisso + costo_chilometrico + costo_autisti

        risultati[scenario] = { "costo_fisso_eur": round(costo_fisso, 2), "costo_chilometrico_eur": round(costo_chilometrico, 2), "costo_autisti_eur": round(costo_autisti, 2), "costo_totale_eur": round(costo_totale, 2)}

    return risultati