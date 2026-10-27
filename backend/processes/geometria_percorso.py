def geometria_percorso(percorso, geometrie):
    features = []

    for partenza, arrivo in zip(percorso, percorso[1:]):
        features.append({
            "type": "Feature",
            "properties": {
                "partenza": partenza,
                "arrivo": arrivo
            },
            "geometry": geometrie[partenza][arrivo]
        })

    return {
        "type": "FeatureCollection",
        "features": features
    }
