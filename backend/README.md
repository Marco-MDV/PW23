# Backend

## 1. Descrizione

Il backend del **Project Work PW23** è sviluppato in Python e si occupa dell'elaborazione dei dati necessari alla pianificazione e al confronto economico delle consegne di un'impresa agroalimentare.

Il caso di studio prende come riferimento **Velotto S.r.l.**, impresa attiva nel commercio all'ingrosso di frutta e ortaggi freschi, con sede legale e logistica a Napoli.

Il programma confronta due scenari distributivi:

- **TSP (Traveling Salesman Problem):** un veicolo con capacità sufficiente a servire tutti i destinatari.
- **VRP (Vehicle Routing Problem):** due veicoli identici di capacità inferiore, entrambi necessari per completare le consegne.

L'ottimizzazione avviene tramite **enumerazione completa**, senza l'impiego di algoritmi euristici o solutori avanzati.

Il backend calcola inoltre i costi dei due scenari ed esegue un'analisi di sensibilità sulle voci economiche.

## 2. Architettura

L'implementazione adotta un'organizzazione modulare, nella quale ciascun file contiene una funzione con una responsabilità specifica.

```text
backend
├── README.md
├── main.py
├── api.py
└── processes
    ├── lettura_json.py
    ├── scrittura_json.py
    ├── calcola_distanza.py
    ├── calcola_percorso_gruppo.py
    ├── calcolo_percorso_ottimale_singolo_furgone.py
    ├── calcolo_percorso_ottimale_doppio_furgone.py
    ├── calcola_costi.py
    └── analisi_sensibilita.py
```

### Responsabilità dei moduli

| Modulo | Responsabilità |
|---|---|
| `main.py` | Punto di ingresso e coordinamento delle elaborazioni |
| `api.py` | Espone le funzionalità del backend tramite API REST sviluppate con Flask |
| `lettura_json.py` | Lettura dei dataset JSON |
| `scrittura_json.py` | Scrittura dei dataset JSON |
| `calcola_distanza.py` | Acquisizione delle distanze stradali |
| `calcola_percorso_gruppo.py` | Individuazione del percorso minimo per un gruppo di clienti |
| `calcolo_percorso_ottimale_singolo_furgone.py` | Risoluzione TSP |
| `calcolo_percorso_ottimale_doppio_furgone.py` | Risoluzione VRP |
| `calcola_costi.py` | Valutazione economica dei due scenari |
| `analisi_sensibilita.py` | Confronto economico al variare di un parametro |

## 3. Dataset utilizzati

I dati vengono letti dalla cartella `data`, situata nella radice del repository.

### `distanze.json`

Contiene i sei nodi del problema e una matrice **6 × 6** delle distanze stradali.

- `D`: deposito di riferimento, Napoli.
- `C1`: cliente di Volla.
- `C2`: cliente di Cercola.
- `C3`: cliente di Casoria.
- `C4`: cliente di San Giorgio a Cremano.
- `C5`: cliente di Portici.

La matrice è **direzionale**, pertanto la distanza da un nodo A a un nodo B può differire da quella del percorso inverso.

Le distanze vengono ricavate attraverso servizi cartografici basati su OpenStreetMap, utilizzando Nominatim per la geocodifica e OSRM per il routing stradale.

### `parametri.json`

Contiene i parametri simulati della distribuzione:

| Parametro | Veicolo unico | Due veicoli |
|---|---:|---:|
| Numero veicoli | 1 | 2 |
| Capacità per veicolo | 1.300 kg | 500 kg |
| Costo fisso per veicolo | 95 € | 55 € |
| Costo chilometrico | 0,45 €/km | 0,30 €/km |
| Costo orario autista | 20 €/h | 20 €/h |

La domanda complessiva è pari a **900 kg**.

Sono inoltre specificati i tempi di scarico, una velocità media convenzionale di 30 km/h e i valori utilizzati nell'analisi di sensibilità.


## 4. Modelli di ottimizzazione

### 4.1 Scenario TSP

Il Traveling Salesman Problem viene risolto mediante enumerazione completa delle permutazioni dei cinque clienti.

Per ogni permutazione il programma:

1. Costruisce un percorso con partenza e ritorno al deposito.
2. Calcola la distanza complessiva.
3. Confronta la distanza con il minimo corrente.
4. Memorizza il percorso migliore.

Con cinque clienti vengono valutate:

**5! = 120 permutazioni.**

Il veicolo deve essere in grado di trasportare l'intera domanda.

### 4.2 Scenario VRP

Il Vehicle Routing Problem viene affrontato considerando due furgoni identici, ciascuno con capacità massima di 500 kg.

Il programma:

1. Genera le possibili ripartizioni dei clienti.
2. Calcola il carico assegnato a ogni furgone.
3. Esclude le ripartizioni che violano i limiti di capacità.
4. Enumera tutti i possibili ordinamenti dei clienti di ciascun gruppo.
5. Calcola la distanza minima di entrambi i percorsi.
6. Individua la soluzione con distanza complessiva minore.

Ogni cliente viene servito esattamente una volta ed entrambi i furgoni devono essere utilizzati.

Le suddivisioni con i furgoni scambiati possono essere valutate più volte, senza compromettere la correttezza dell'enumerazione.

## 5. Risultati dell'ottimizzazione

Con la matrice delle distanze utilizzata nel caso di studio:

### Scenario TSP

**Percorso:** `D → C3 → C1 → C2 → C4 → C5 → D`

- Distanza complessiva: **47,12 km**
- Carico: **900 kg**
- Capacità: **1.300 kg**

### Scenario VRP

**Furgone 1:** `D → C2 → C4 → D`

- Distanza: **14,91 km**
- Carico: **430 kg**

**Furgone 2:** `D → C5 → C3 → C1 → D`

- Distanza: **43,35 km**
- Carico: **470 kg**

**Distanza complessiva VRP: 58,26 km.**

Lo scenario TSP percorre quindi **11,14 km in meno**.

## 6. Confronto economico

Il confronto considera tre categorie di costo:

- Costo fisso dei veicoli.
- Costo variabile proporzionale ai chilometri percorsi.
- Costo degli autisti, comprensivo dei tempi di guida e scarico.

La formula utilizzata è:

```text
Costo totale = costo fisso per veicolo × numero veicoli + distanza totale × costo chilometrico + ore complessive autisti × costo orario
```

I tempi di guida sono stimati sulla base della velocità media specificata nei parametri.

Nel caso VRP, il costo del personale comprende **la somma delle ore di lavoro dei due conducenti**.

Con i parametri iniziali, i valori economici attesi sono:

| Voce | TSP | VRP |
|---|---:|---:|
| Costi fissi | 95,00 € | 110,00 € |
| Costi chilometrici | 21,20 € | 17,48 € |
| Costi autisti | 73,08 € | 80,51 € |
| **Costo complessivo** | **189,28 €** | **207,98 €** |


## 7. Analisi di sensibilità

Il progetto valuta come varia la convenienza economica modificando il **costo fisso del veicolo unico**, mantenendo invariati gli altri parametri.

I valori considerati sono:

```text
60€, 80€, 95€, 110€, 130€, 150€, 170€, 190€
```

Per ogni valore vengono confrontati i costi complessivi TSP e VRP.

Nel modello iniziale, la soglia di equivalenza economica è pari a circa **113,70 €** di costo fisso del furgone unico.

Al di sotto di tale soglia risulta più conveniente il TSP; al di sopra, il VRP.

L'analisi consente di distinguere la soluzione che minimizza la distanza da quella economicamente preferibile.

## 8. Avvio del backend

### Prerequisiti

- Python 3.
- Dataset JSON presenti nella cartella `data`.
- Connessione Internet soltanto per l'eventuale ricalcolo delle distanze stradali.

Gli algoritmi di ottimizzazione utilizzano la libreria standard Python, in particolare `json`, `itertools` e `pathlib`.

### Esecuzione

Aprire un terminale nella cartella `backend/` ed eseguire:


```powershell
py .\main.py
```

Il programma richiama le funzioni di elaborazione dal modulo principale.

Gli algoritmi TSP e VRP restituiscono dizionari contenenti percorsi, distanze e quantità trasportate, utilizzabili dai successivi moduli di calcolo economico e dal frontend.

### API REST — Flask

Per consentire la comunicazione tra backend e frontend è stato integrato il framework **Flask**, attraverso il quale i risultati delle elaborazioni Python vengono esposti tramite richieste HTTP.

Il file `api.py` gestisce le richieste provenienti dal frontend e richiama `main.py`, che coordina l'esecuzione degli algoritmi TSP, VRP, del confronto economico e dell'analisi di sensibilità.

#### Installazione

```powershell
py -m pip install flask
```

#### Avvio del server

Dalla cartella `backend/` eseguire:

```powershell
py -m flask --app api run --debug --host 127.0.0.1 --port 5050
```

Il server viene avviato in ambiente locale sulla porta `5050`.

#### Endpoint disponibile

| Metodo | Endpoint | Descrizione |
|---|---|---|
| GET | `/api/risultati` | Restituisce i risultati delle elaborazioni in formato JSON |

L'endpoint è raggiungibile all'indirizzo:

`http://127.0.0.1:5050/api/risultati`

La risposta comprende i risultati TSP e VRP, il confronto economico e l'analisi di sensibilità.

Questa implementazione consente al frontend di recuperare i risultati senza accedere direttamente ai file Python o ai dataset JSON.

L'attuale API espone i risultati in sola lettura. Eventuali funzionalità per modificare i parametri ed eseguire nuove simulazioni direttamente dall'interfaccia potranno essere integrate successivamente.

**Nota:** il server Flask viene avviato in modalità debug esclusivamente per lo sviluppo locale.

### Ricalcolo delle distanze

La funzione `calcola_distanza()` utilizza servizi esterni e aggiorna `data/distanze.json`.

Non viene avviata automaticamente insieme agli algoritmi: deve essere richiamata esplicitamente quando si desidera aggiornare la matrice.

Poiché modifica il dataset, è opportuno conservarne una copia prima di effettuare nuove rilevazioni.

## 9. Limiti e ipotesi del modello

Il progetto è una **simulazione didattica indipendente**.

- Ordini, quantità, capacità dei veicoli e costi sono simulati.
- I tempi di percorrenza derivano da una velocità media convenzionale e non costituiscono previsioni del traffico in tempo reale.
- Il modello minimizza la **distanza totale**; il confronto economico viene effettuato successivamente sui percorsi individuati.

L'enumerazione completa garantisce la ricerca dell'ottimo rispetto all'istanza e ai vincoli implementati, ma la complessità computazionale cresce rapidamente all'aumentare dei destinatari.

## 10. Integrazione con il frontend

Il backend produce risultati strutturati destinati alla visualizzazione mediante un'interfaccia web.

La rappresentazione dovrà comprendere:

- Grafo della rete distributiva.
- Percorsi ottimali TSP e VRP.
- Ripartizione delle consegne e verifica delle capacità.
- Confronto dei costi.
- Grafico dell'analisi di sensibilità.

La comunicazione tra frontend e backend avviene tramite API REST. Il frontend effettua richieste HTTP all'endpoint /api/risultati, mentre Flask restituisce le elaborazioni in formato JSON. Tale architettura mantiene separata la logica applicativa Python dalla rappresentazione grafica, consentendo l'utilizzo di HTML, CSS e JavaScript tradizionali oppure di framework frontend come React.

## 11. Documentazione correlata

- [Documentazione generale](../README.md)
- [Dataset e ipotesi](../data/README.md)
- [Documentazione frontend](../frontend/README.md)

---

**Project Work:** PW23 — Informatica per le Aziende Digitali (L-31)

**Caso di studio:** Velotto S.r.l.

**Linguaggio backend:** Python

**Metodo di ottimizzazione:** Enumerazione completa
