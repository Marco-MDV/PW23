# Documentazione e gestione dei dati

## 1. Descrizione

La cartella `data` contiene le informazioni e i dataset utilizzati per lo sviluppo del **Project Work PW23 — Pianificazione e confronto economico dei percorsi di consegna di un'impresa agroalimentare**.

L'obiettivo è organizzare e documentare i dati necessari per rappresentare una rete logistica composta da un deposito e cinque destinatari, utilizzata per l'analisi e l'ottimizzazione dei percorsi di distribuzione.

Il caso di studio prende come riferimento **Velotto S.r.l.**, azienda operante nel commercio all'ingrosso di frutta e ortaggi freschi, con sede legale nel Comune di Napoli.

I dati sono suddivisi in due categorie:

- **Dati reali:** informazioni societarie, attività commerciali, indirizzi e distanze stradali.
- **Dati simulati:** ordini, quantità, capacità dei veicoli e parametri economici utilizzati per lo studio.

Questa distinzione consente di sviluppare un modello logistico realistico senza attribuire alle imprese informazioni operative non documentate.

## 2. Organizzazione della cartella

La struttura della cartella è la seguente:

```
data
├── README.md
├── fornitore.md
├── destinatari.md
├── destinatari.json
├── distanze.json          
└── parametri.json         
```

### 2.1 fornitore.md

Il documento [`fornitore.md`](./fornitore.md) contiene le informazioni relative all'azienda selezionata come riferimento del progetto.

Le principali informazioni comprendono:

- Presentazione aziendale.
- Ragione sociale e dati identificativi.
- Sede legale e logistica.
- Settore di attività e classificazione ATECO.
- Dati economici disponibili.
- Fonti utilizzate.

L'impresa selezionata è **Velotto S.r.l.**, con sede legale e logistica in Via Luigi Volpicella 214, Napoli.

### 2.2 destinatari.md

Il documento [`destinatari.md`](./destinatari.md) raccoglie le informazioni descrittive delle cinque attività commerciali selezionate come destinazioni.

Le attività sono realmente esistenti e si trovano in cinque comuni limitrofi a Napoli.

| ID | Attività                   | Comune                |
| -- | -------------------------- | --------------------- |
| C1 | Il Brigante Ilario Tutucci | Volla                 |
| C2 | Ristorante Del Pino        | Cercola               |
| C3 | Pizzeria I Vesuviani       | Casoria               |
| C4 | Conad City                 | San Giorgio a Cremano |
| C5 | Euroesse Supermarket       | Portici               |

### 2.3 destinatari.json

Il file `destinatari.json` rappresenta la versione strutturata dei dati contenuti in `destinatari.md`.

Per ogni destinatario sono previsti i seguenti attributi:

| Attributo   | Descrizione                             |
| ----------- | --------------------------------------- |
| `id`        | Identificativo univoco del destinatario |
| `nome`      | Denominazione dell'attività             |
| `tipologia` | Categoria commerciale                   |
| `indirizzo` | Indirizzo del punto di consegna         |
| `comune`    | Comune di appartenenza                  |
| `provincia` | Provincia di appartenenza               |

Il formato JSON consente al backend Python di leggere le informazioni senza doverle estrarre dai documenti Markdown.

### 2.4 distanze.json

La matrice è **direzionale**: la distanza da un nodo A a un nodo B può differire dalla distanza del percorso inverso, a causa della configurazione della rete stradale.

Il file contiene le seguenti proprietà principali:

| Proprietà | Descrizione |
|---|---|
| `metadati` | Fonte, metodo di acquisizione, unità di misura e caratteristiche della matrice |
| `nodi` | Identificativi e indirizzi delle sei località |
| `matrice_km` | Matrice direzionale delle distanze stradali |
| `geometrie_stradali` | Geometrie GeoJSON dei percorsi tra le coppie di nodi |
| `coordinate_nodi` | Coordinate geografiche dei nodi |

Le geometrie stradali sono utilizzate dal frontend per rappresentare i percorsi ottimali sulla mappa interattiva Leaflet.

I valori rappresentano distanze calcolate da un servizio di routing e non misurazioni effettuate direttamente su strada.

Il dataset è già popolato e viene utilizzato dal backend per le elaborazioni TSP e VRP. L'acquisizione delle distanze non viene ripetuta automaticamente a ogni avvio dell'applicazione.

### 2.5 parametri.json

Il file [`parametri.json`](./parametri.json) contiene i parametri utilizzati per simulare e confrontare le configurazioni logistiche TSP e VRP.

I dati comprendono:

- Identificativo del deposito.
- Quantità da consegnare a ciascun destinatario.
- Domanda complessiva.
- Numero e capacità dei veicoli.
- Costi fissi e chilometrici.
- Costo orario degli autisti.
- Velocità media convenzionale.
- Tempi di scarico per destinatario.
- Vincoli dell'ottimizzazione.
- Valori dell'analisi di sensibilità.

La domanda complessiva è pari a **900 kg**.

Sono definiti due scenari:

| Parametro | TSP | VRP |
|---|---|---|
| Veicoli | 1 | 2 |
| Capacità per veicolo | 1.300 kg | 500 kg |
| Costo fisso per veicolo | 95 € | 55 € |
| Costo chilometrico | 0,45 €/km | 0,30 €/km |
| Costo orario autista | 20 €/h | 20 €/h |

Nel secondo scenario, la domanda complessiva supera la capacità di un singolo furgone da 500 kg; è pertanto necessario utilizzare entrambi i veicoli.

Le quantità, le capacità, i tempi operativi e i costi sono **ipotesi didattiche** definite per il caso di studio e non rappresentano dati operativi ufficiali di Velotto S.r.l.

I parametri vengono letti dal backend Python ed elaborati per il calcolo dei percorsi, dei costi e dell'analisi di sensibilità.

## 3. Convenzioni dei dati

Per garantire uniformità tra dataset e componenti applicativi saranno adottate le seguenti convenzioni:

| Elemento                     | Convenzione                                 |
| ---------------------------- | ------------------------------------------- |
| Formato strutturato          | JSON                                        |
| Codifica dei file            | UTF-8                                       |
| Identificativo deposito      | `D`                                         |
| Identificativi destinatari   | `C1`, `C2`, `C3`, `C4`, `C5`                |
| Unità delle distanze         | Chilometri (km)                             |
| Unità delle quantità         | chilogrammo (kg)                            |
| Valuta                       | Euro (EUR)                                  |
| Separatore decimale nei JSON | Punto (`.`)                                 |

Gli identificativi resteranno invariati in tutti i dataset per consentire il corretto collegamento delle informazioni.

## 4. Provenienza e attendibilità

I dati utilizzati nel progetto provengono da fonti differenti e vengono distinti in base alla loro natura.

### Informazioni aziendali

Le informazioni relative a Velotto S.r.l. sono state raccolte attraverso fonti societarie pubblicamente consultabili e documentate nel file [`fornitore.md`](./fornitore.md).

L'indirizzo della sede aziendale è utilizzato come deposito di riferimento del modello.

### Destinatari e localizzazioni

I cinque destinatari sono attività commerciali selezionate nell'area di Napoli e nei comuni limitrofi.

Le informazioni descrittive e gli indirizzi sono riportati nei file `destinatari.md` e `destinatari.json`.

### Distanze stradali

Le distanze sono state ottenute mediante geocodifica Nominatim e routing OSRM basati su dati OpenStreetMap.

Lo script Python ha acquisito la lunghezza dei percorsi e le rispettive geometrie GeoJSON.

Il dataset contiene le distanze per tutte le coppie di nodi distinte e tiene conto della direzionalità della rete stradale.

Le distanze costituiscono una rappresentazione della rete stradale calcolata dal servizio di routing, senza garanzia di corrispondenza con il traffico o le condizioni viarie attuali.

### Parametri simulati

Ordini, quantità, capacità dei veicoli, tempi di scarico e costi sono definiti mediante ipotesi didattiche.

La separazione tra dati territoriali e parametri simulati consente di rendere esplicite le assunzioni utilizzate nell'analisi e di riprodurre i risultati.

## 5. Utilizzo dei dati nel progetto

I dataset presenti nella cartella vengono utilizzati dai componenti applicativi per:

1. Identificare il deposito e i cinque punti di consegna.
2. Costruire la matrice direzionale delle distanze stradali.
3. Calcolare i percorsi ottimi TSP e VRP mediante enumerazione completa.
4. Verificare il rispetto dei vincoli di capacità.
5. Stimare i costi di distribuzione.
6. Eseguire l'analisi di sensibilità economica.
7. Rappresentare i risultati attraverso la dashboard web.

L'elaborazione dei dati è gestita dal backend Python, mentre il frontend Next.js/React utilizza le informazioni restituite dall'API Flask per visualizzare:

- Il contesto aziendale e i dati della simulazione.
- I percorsi ottimali sulla mappa interattiva.
- I grafi orientati delle soluzioni.
- Il confronto logistico ed economico.
- Il grafico dell'analisi di sensibilità.

Per maggiori informazioni sull'implementazione si rimanda alle rispettive documentazioni:

- [Backend](../backend/README.md)
- [Frontend](../frontend/README.md)
- [Documentazione generale](../README.md)
