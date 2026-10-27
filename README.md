# PW23 - Ottimizzazione dei percorsi di distribuzione agroalimentare

**Project Work universitario**  
**Corso di laurea:** Informatica per le Aziende Digitali (L-31)  
**Autore:** Marco De Vincentiis  
**Caso di studio:** Velotto S.r.l. - Napoli

## 1. Descrizione del progetto

PW23 è un'applicazione sviluppata per analizzare e ottimizzare la distribuzione stradale di prodotti agroalimentari, confrontando due differenti configurazioni logistiche.

Il progetto prende come riferimento **Velotto S.r.l.**, un'impresa operante nel commercio all'ingrosso di frutta e ortaggi freschi, e costruisce una simulazione di consegna verso cinque attività commerciali situate nei comuni limitrofi a Napoli.

L'obiettivo consiste nell'individuare i percorsi ottimali mediante algoritmi di enumerazione completa e valutare la convenienza economica di due scenari:

- **TSP - Traveling Salesman Problem:** tutte le consegne sono effettuate da un unico veicolo.
- **VRP - Vehicle Routing Problem:** le consegne sono suddivise tra due furgoni, rispettando i rispettivi vincoli di capacità.

Il sistema comprende un backend Python per l'elaborazione e un frontend web interattivo per la consultazione dei risultati.

## 2. Obiettivi

Gli obiettivi principali sono:

1. Analizzare un'impresa del settore agroalimentare e il relativo contesto distributivo.
2. Definire una rete logistica composta da un deposito e cinque punti di consegna.
3. Acquisire una matrice di distanze stradali tra tutte le località.
4. Risolvere il problema TSP mediante enumerazione completa.
5. Risolvere un problema VRP con due veicoli e vincoli di capacità.
6. Confrontare le distanze percorse e i costi complessivi.
7. Eseguire un'analisi di sensibilità sui parametri economici.
8. Presentare dati, percorsi e risultati attraverso una dashboard web.

## 3. Caso di studio e dati utilizzati

### 3.1 Impresa di riferimento

L'impresa selezionata è **Velotto S.r.l.**, operante nel commercio all'ingrosso di prodotti ortofrutticoli freschi.

Ai fini del modello, viene utilizzato come deposito di partenza e ritorno l'indirizzo:

**Via Luigi Volpicella 214, 80147 Napoli (NA).**

### 3.2 Destinatari

La rete distributiva comprende cinque punti di consegna:

| ID | Destinatario | Comune | Domanda simulata |
|---|---|---|---:|
| C1 | Il Brigante Ilario Tutucci | Volla | 100 kg |
| C2 | Ristorante Del Pino | Cercola | 130 kg |
| C3 | Pizzeria I Vesuviani | Casoria | 90 kg |
| C4 | Conad City | San Giorgio a Cremano | 300 kg |
| C5 | Euroesse Supermarket | Portici | 280 kg |
| **Totale** | | | **900 kg** |

Le località e le attività commerciali sono state selezionate come riferimenti territoriali reali.

### 3.3 Distanze stradali

Il problema utilizza una matrice direzionale **6 × 6** che comprende il deposito e i cinque destinatari.

Le distanze sono state acquisite attraverso:

- **OpenStreetMap / Nominatim**, per la geocodifica degli indirizzi.
- **OSRM**, per il calcolo dei percorsi stradali con profilo `driving`.

Per ciascuna coppia di nodi sono memorizzate la distanza, espressa in chilometri, e la geometria stradale del percorso.

La matrice è direzionale: la distanza da A a B può essere diversa da quella da B ad A.

I risultati utilizzano il dataset salvato in `data/distanze.json`.

Ulteriori dettagli sono presenti nella [documentazione dei dati](./data/README.md).

## 4. Scenari logistici

| Parametro | TSP - Veicolo unico | VRP - Due veicoli |
|---|---:|---:|
| Numero di veicoli | 1 | 2 |
| Capacità per veicolo | 1.300 kg | 500 kg |
| Capacità complessiva | 1.300 kg | 1.000 kg |
| Domanda da trasportare | 900 kg | 900 kg |
| Costo fisso per veicolo | 95,00 € | 55,00 € |
| Costo chilometrico | 0,45 €/km | 0,30 €/km |
| Costo orario per autista | 20,00 €/h | 20,00 €/h |

Per la stima dei tempi di guida viene adottata una velocità media convenzionale di **30 km/h**, alla quale si aggiungono i tempi di scarico definiti per ciascun destinatario.

Nel secondo scenario è necessario utilizzare entrambi i veicoli, poiché la domanda totale di 900 kg supera la capacità di un singolo furgone da 500 kg.

Tutti i parametri operativi ed economici sono simulati e configurabili nel file `data/parametri.json`.

## 5. Metodologia di ottimizzazione

### 5.1 Traveling Salesman Problem - TSP

L'algoritmo considera tutte le permutazioni dei cinque destinatari e individua il percorso con distanza totale minima.

Ogni percorso:

- Parte dal deposito `D`.
- Visita ciascuno dei cinque destinatari esattamente una volta.
- Termina nuovamente al deposito.
- Rispetta la capacità del veicolo.

Con cinque clienti vengono esaminate **5! = 120 permutazioni**.

### 5.2 Vehicle Routing Problem - VRP

Il problema viene risolto mediante enumerazione delle possibili ripartizioni dei destinatari tra due furgoni.

Per ogni ripartizione, il programma:

1. Verifica il rispetto delle capacità di carico.
2. Determina il percorso minimo per ciascun gruppo di destinatari.
3. Calcola la somma delle distanze percorse dai due veicoli.
4. Conserva la soluzione con distanza complessiva minima.

Ogni destinatario viene servito una sola volta e ciascun furgone parte dal deposito e vi ritorna.

L'enumerazione completa consente di individuare l'ottimo rispetto ai dati e ai vincoli del modello, senza ricorrere ad algoritmi euristici.

## 6. Risultati della simulazione

I seguenti risultati si riferiscono alla matrice stradale e ai parametri attualmente utilizzati dal progetto.

### 6.1 Percorsi ottimi

**TSP - Veicolo unico**

`D → C3 → C1 → C2 → C4 → C5 → D`

- Distanza totale: **46,75 km**
- Carico trasportato: **900 kg**
- Capacità disponibile: **1.300 kg**

**VRP - Due veicoli**

Furgone 1:

`D → C2 → C4 → D`

- Distanza: **15,83 km**
- Carico: **430 kg**

Furgone 2:

`D → C5 → C3 → C1 → D`

- Distanza: **44,27 km**
- Carico: **470 kg**

La distanza complessiva dello scenario VRP è **60,10 km**.

### 6.2 Confronto economico

Il modello considera costi fissi dei veicoli, costi chilometrici e costi degli autisti, calcolati in base ai tempi di guida e scarico.

| Indicatore | TSP | VRP |
|---|---:|---:|
| Distanza complessiva | 46,75 km | 60,10 km |
| Costi fissi | 95,00 € | 110,00 € |
| Costi chilometrici | 21,04 € | 18,03 € |
| Costi autisti | 72,83 € | 81,73 € |
| **Costo totale** | **188,87 €** | **209,76 €** |

Nella configurazione iniziale, il TSP risulta più conveniente:

- **13,35 km** percorsi in meno.
- **20,89 €** di risparmio stimato rispetto al VRP.

I valori economici dipendono dai parametri simulati e non rappresentano costi effettivamente sostenuti dall'impresa.

### 6.3 Analisi di sensibilità

Il sistema valuta come cambia la convenienza economica modificando il **costo fisso unitario del veicolo nello scenario TSP**, espresso in euro per veicolo (€/veicolo), mantenendo invariati gli altri parametri economici.

I valori considerati sono:

`60, 80, 95, 110, 130, 150, 170, 190 €`

Con i parametri attuali, la soglia di equivalenza economica è pari a circa **115,89 €** di costo fisso del veicolo unico.

- Al di sotto della soglia risulta più conveniente lo scenario TSP.
- Al di sopra della soglia risulta più conveniente lo scenario VRP.

La soglia è calcolata dal modello economico; il grafico visualizza i valori di sensibilità configurati.

## 7. Architettura del sistema

Il progetto adotta un'architettura composta da tre livelli:

- **Data:** dataset JSON e documentazione delle informazioni utilizzate.
- **Backend:** elaborazione Python, ottimizzazione dei percorsi, calcolo dei costi e API Flask.
- **Frontend:** dashboard Next.js e React per la visualizzazione dei risultati.

Il frontend interroga l'endpoint `GET /api/risultati`, esposto dal backend Flask. La risposta JSON contiene percorsi ottimi, geometrie stradali, costi, matrice delle distanze e risultati dell'analisi di sensibilità.

### 7.1 Tecnologie

| Area | Tecnologie |
|---|---|
| Ottimizzazione e calcolo | Python, `itertools`, `json` |
| API | Flask |
| Frontend | Next.js, React, JavaScript, TypeScript |
| Interfaccia | Tailwind CSS |
| Cartografia | Leaflet, React Leaflet, OpenStreetMap, GeoJSON |
| Grafici economici | Recharts |
| Grafi orientati | SVG |
| Validazione API | Zod |
| Dati | JSON |

### 7.2 Struttura del repository

```text
PW23/
├── README.md
├── LICENSE
├── .gitignore
├── allegatoPW23.pdf
├── Template Project WorkPW23.docx
│
├── backend/
│   ├── README.md
│   ├── api.py
│   ├── main.py
│   └── processes/
│       ├── calcola_distanza.py
│       ├── calcola_percorso_gruppo.py
│       ├── calcolo_percorso_ottimale_singolo_furgone.py
│       ├── calcolo_percorso_ottimale_doppio_furgone.py
│       ├── calcolo_costi.py
│       ├── analisi_sensibilita.py
│       ├── geometria_percorso.py
│       ├── lettura_json.py
│       └── scrittura_json.py
│
├── data/
│   ├── README.md
│   ├── fornitore.md
│   ├── destinatari.md
│   ├── destinatari.json
│   ├── distanze.json
│   ├── distanze_backup.json
│   └── parametri.json
│
└── frontend/
    ├── README.md
    ├── package.json
    ├── package-lock.json
    ├── next.config.ts
    └── app/
        ├── page.tsx
        ├── layout.tsx
        ├── lib/
        │   └── risultatiSchema.js
        └── components/
            ├── MainElements.jsx
            ├── ContestoLogistico.jsx
            ├── GrafoPercorsi.jsx
            ├── GraficoSensibilita.jsx
            ├── MappaPercorsi.jsx
            ├── MappaLeaflet.jsx
            └── ...altri componenti
```

Per l'elenco dettagliato dei componenti e delle rispettive responsabilità, consultare i README specifici.

## 8. Dashboard web

Il frontend consente di consultare i risultati mediante una pagina web interattiva.

Le principali funzionalità disponibili sono:

- **Contesto logistico:** descrizione dell'impresa, destinatari, domande e parametri degli scenari.
- **Indicatori riepilogativi:** distanze complessive e informazioni sulle consegne.
- **Mappa stradale interattiva:** visualizzazione delle geometrie reali dei percorsi TSP e VRP, con filtri per scenario.
- **Confronto logistico:** tabelle con distanze, capacità, carichi e informazioni economiche.
- **Grafo delle soluzioni ottime:** rappresentazione schematica dei nodi, degli archi orientati e dei relativi pesi.
- **Grafico di sensibilità:** confronto dei costi totali dei due scenari al variare del costo fisso TSP.

La dashboard gestisce gli stati di caricamento e di errore e valida la struttura principale della risposta JSON tramite Zod.

## 9. Installazione e avvio

### 9.1 Prerequisiti

Per eseguire il progetto sono necessari:

- Python 3.
- Node.js in una versione compatibile con Next.js 16.
- npm.
- Git, per clonare il repository.
- Connessione Internet per caricare la cartografia OpenStreetMap.

I dataset necessari all'ottimizzazione sono inclusi nel repository. **Non è necessario richiamare i servizi Nominatim e OSRM a ogni avvio.**

### 9.2 Clonazione

Aprire un terminale ed eseguire:

```bash
git clone https://github.com/Marco-MDV/PW23.git
cd PW23
```

### 9.3 Avvio del backend

Dal terminale, accedere alla cartella `backend`:

```bash
cd backend
python -m pip install flask
python -m flask --app api run --host 127.0.0.1 --port 5050
```

Il server Flask espone i risultati all'indirizzo:

`http://127.0.0.1:5050/api/risultati`

Su Windows, se il comando `python` non è disponibile, è possibile utilizzare il launcher `py`.

### 9.4 Avvio del frontend

Aprire **un secondo terminale** dalla radice del repository ed eseguire:

```bash
cd frontend
npm ci
npm run dev
```

Aprire nel browser:

**http://localhost:3000**

La dashboard utilizza il proxy configurato in `frontend/next.config.ts` per inoltrare le richieste `/api/*` al server Flask sulla porta `5050`.

**Importante:** il backend deve essere avviato precedentemente al frontend cosi da non riscontrare eventuali disservizi di non raggiungibilità.

Se la porta predefinita di Next.js è occupata, controllare l'indirizzo effettivamente indicato nel terminale.

### 9.5 Verifiche disponibili

Per verificare il codice frontend:

```bash
cd frontend
npm run lint
npm run build
```

I comandi consentono rispettivamente di eseguire il controllo ESLint e verificare la compilazione del progetto.

La verifica completa dell'applicazione richiede anche il corretto avvio del backend e il caricamento della dashboard nel browser.

## 10. Utilizzo dei dati e riproducibilità

La simulazione può essere riprodotta utilizzando i file presenti nella directory `data/`.

I principali dataset sono:

| File | Contenuto |
|---|---|
| `distanze.json` | Nodi, matrice delle distanze, coordinate e geometrie stradali |
| `destinatari.json` | Informazioni strutturate dei cinque punti di consegna |
| `parametri.json` | Domande, capacità dei veicoli, tempi, costi e valori di sensibilità |

I parametri possono essere modificati nei file JSON. I risultati vengono ricalcolati dal backend quando viene richiesta l'API.

La modifica dei destinatari o della rete stradale può invece richiedere una nuova acquisizione delle distanze tramite il modulo `calcola_distanza.py`.

Il ricalcolo delle distanze utilizza servizi esterni e modifica il dataset; pertanto è consigliabile conservarne una copia prima di procedere.

## 11. Documentazione del progetto

Per approfondimenti tecnici e metodologici:

| Documento | Contenuto |
|---|---|
| [README backend](./backend/README.md) | Architettura Python, algoritmi TSP/VRP, costi e API Flask |
| [README frontend](./frontend/README.md) | Componenti React, dashboard, cartografia e visualizzazioni |
| [README dati](./data/README.md) | Dataset, convenzioni, provenienza e ipotesi |
| [Documentazione aziendale](./data/fornitore.md) | Informazioni su Velotto S.r.l. |
| [Destinatari](./data/destinatari.md) | Informazioni sui punti di consegna |
| [Traccia del Project Work](./allegatoPW23.pdf) | Documento universitario di riferimento |
| [Template della relazione](./Template%20Project%20WorkPW23.docx) | Modello predisposto per la relazione finale |

## 12. Autore e licenza

**Marco De Vincentiis**

Project Work sviluppato nell'ambito del corso di laurea in Informatica per le Aziende Digitali (L-31) dell'Università Telematica Pegaso.

Il codice del repository è distribuito secondo i termini della [licenza MIT](./LICENSE).

Le denominazioni aziendali e i dati cartografici appartengono ai rispettivi titolari e sono utilizzati esclusivamente come riferimenti per il caso di studio didattico.