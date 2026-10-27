from itertools import permutations

def calcola_percorso_gruppo(gruppo, matrice):
    distanza_minima = float("inf")
    percorso_migliore = None

    for combinazione in permutations(gruppo):
        percorso = ["D", *combinazione, "D"]

        distanza = sum(
            matrice[percorso[i]][percorso[i + 1]]
            for i in range(len(percorso) - 1)
        )

        if distanza < distanza_minima:
            distanza_minima = distanza
            percorso_migliore = percorso

    return percorso_migliore, distanza_minima