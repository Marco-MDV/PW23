# Frontend

## 1. Descrizione del progetto

Il frontend di **PW23** è un'applicazione web sviluppata per visualizzare, analizzare e confrontare i risultati di una simulazione logistica relativa alla distribuzione di merci verso più destinazioni.

L'applicazione rappresenta il livello di presentazione del sistema PW23 e permette di consultare, attraverso una dashboard, i risultati elaborati dal backend.

Il confronto riguarda due scenari logistici:

- **TSP (Traveling Salesman Problem):** un singolo veicolo effettua le consegne seguendo un percorso che comprende tutte le destinazioni e il ritorno al deposito.
- **VRP (Vehicle Routing Problem):** le consegne vengono suddivise tra due furgoni, tenendo conto delle rispettive assegnazioni di percorso e dei carichi trasportati.

La dashboard presenta distanze, informazioni sui veicoli, capacità di carico, percorsi, rappresentazioni cartografiche e indicatori economici.

L'ottimizzazione dei percorsi e il calcolo dei risultati sono responsabilità del backend. Il frontend riceve tali risultati e li presenta all'utente.

---

## 2. Tecnologie utilizzate

| Tecnologia | Utilizzo |
|---|---|
| Next.js | Framework dell'applicazione frontend |
| React | Componenti e gestione dell'interfaccia |
| JavaScript / JSX | Implementazione dei componenti |
| TypeScript / TSX | Layout e pagina principale |
| Tailwind CSS | Stili e layout responsive |
| React Leaflet | Integrazione della mappa interattiva |
| Leaflet | Rendering cartografico e geometrie |
| OpenStreetMap | Fornitura delle tessere cartografiche |
| GeoJSON | Rappresentazione geografica dei percorsi |
| Fetch API | Comunicazione HTTP con il backend |
| Zod | Validazione dei dati JSON ricevuti dal backend |
| Recharts | Realizzazione del grafico di analisi di sensibilità economica |
| SVG | Rappresentazione dei grafi orientati delle soluzioni ottime TSP e VRP |

L'applicazione utilizza l'**App Router di Next.js**, con la struttura delle pagine all'interno della directory `app/`.

---

## 3. Architettura frontend

L'applicazione è organizzata secondo un'architettura basata su componenti React.

Il sistema può essere suddiviso in quattro livelli logici:

1. **Layout:** definisce la struttura generale della pagina, comprendente intestazione, contenuto e footer.
2. **Gestione dei dati:** effettua la richiesta HTTP al backend e controlla lo stato della risposta.
3. **Presentazione:** costruisce i pannelli informativi, le tabelle e il confronto logistico.
4. **Cartografia:** rappresenta i percorsi e i nodi geografici attraverso Leaflet.

### Flusso di funzionamento

```text
Utente
  |
  v
Next.js — page.tsx
  |
  v
MainElements.jsx
  |
  +---- GET /api/risultati
  |          |
  |          v
  |      Backend Flask
  |          |
  |          v
  |      Risposta JSON
  |
  +---- Caricamento
  |       LoadingRow
  |       LoadingBoxs
  |
  +---- Errore
  |       ErrorRow
  |       ErrorBoxs
  |
  +---- Successo
          |
          +---- Validazione Zod
          |
          +---- Row.jsx
          |       Indicatori principali
          |
          +---- ContestoLogistico.jsx
          |       Presentazione aziendale
          |       Quantità per destinatario
          |       Parametri economici
          |       Provenienza dei dati
          |
          +---- Table.jsx
          |       |
          |       +---- BoxTableUno.jsx
          |       |       Mappa
          |       |       Anagrafica nodi
          |       |
          |       +---- BoxTableDue.jsx
          |               Confronto scenari
          |               Dettagli TSP / VRP
          |               Analisi sensibilità
          |               Riepilogo economico
          |
          +---- GrafoPercorsi.jsx
          |       Grafi orientati TSP e VRP
          |       Distanze degli archi
          |
          +---- GraficoSensibilita.jsx
                  Variazione del costo fisso TSP
                  Confronto economico TSP / VRP
```

La responsabilità dei calcoli rimane separata da quella della visualizzazione.

---

## 4. Struttura delle directory

```text
frontend/
|
+-- app/
|   |
|   +-- components/
|   |   +-- BoxDataRow.jsx
|   |   +-- BoxTableDue.jsx
|   |   +-- BoxTableUno.jsx
|   |   +-- ContestoLogistico.jsx
|   |   +-- GrafoPercorsi.jsx
|   |   +-- GraficoSensibilita.jsx
|   |   +-- MainElements.jsx
|   |   +-- MappaLeaflet.jsx
|   |   +-- MappaPercorsi.jsx
|   |   +-- NavbarElements.jsx
|   |   +-- PercorsoTappe.jsx
|   |   +-- Row.jsx
|   |   +-- TabellaConfronto.jsx
|   |   +-- Table.jsx
|   |   +-- TspBox.jsx
|   |   +-- VrpBox.jsx
|   |
|   +-- errorFolder/
|   |   +-- ErrorBoxs.jsx
|   |   +-- ErrorRow.jsx
|   |
|   +-- loadingFolder/
|   |   +-- LoadingBoxs.jsx
|   |   +-- LoadingRow.jsx
|   |
|   +-- favicon.ico
|   +-- globals.css
|   +-- layout.tsx
|   +-- page.tsx
|
+-- README.md
```

---

## 5. Componenti principali

### 5.1 `layout.tsx`

Rappresenta il layout radice dell'applicazione Next.js.

Le sue principali responsabilità sono:

- Definire il documento HTML e il relativo elemento `body`.
- Importare gli stili globali.
- Importare il foglio di stile di Leaflet.
- Configurare i font Geist e Geist Mono.
- Definire i metadata della pagina.

### 5.2 `page.tsx`

È la pagina principale dell'applicazione.

Contiene tre aree:

- **Header:** intestazione del progetto mediante `NavbarElements`.
- **Main:** area di visualizzazione dei risultati mediante `MainElements`.
- **Footer:** informazioni di attribuzione e collegamenti esterni.

`page.tsx` svolge prevalentemente una funzione strutturale. La gestione dei dati avviene in `MainElements.jsx`.

### 5.3 `NavbarElements.jsx`

Visualizza le informazioni introduttive della dashboard:

- Nome del progetto PW23.
- Titolo della dashboard logistica.
- Descrizione sintetica del sistema.
- Informazioni sul deposito Velotto S.r.l.
- Riferimento al progetto universitario di Logistica e Trasporti.

Il componente utilizza classi responsive per modificare la visibilità di alcuni elementi in base alla dimensione dello schermo.

### 5.4 `MainElements.jsx`

È il componente principale per il recupero dei dati e la gestione degli stati applicativi.

Utilizza:

- `useState` per memorizzare i risultati e gli stati.
- `useEffect` per avviare il recupero dei dati.
- `fetch` per effettuare la richiesta HTTP al backend.

Gli stati logici gestiti sono:

| Stato | Significato |
|---|---|
| `data` | Dati JSON ricevuti dal backend |
| `loading` | Richiesta HTTP in corso |
| `error` | Errore durante il recupero o l'elaborazione della risposta |
| `errorMessage` | Messaggio associato all'errore |

In caso di successo e dopo la validazione tramite Zod, `MainElements` distribuisce i dati ai componenti `Row`, `ContestoLogistico`, `Table`, `GrafoPercorsi` e `GraficoSensibilita`.
In caso di caricamento o errore, visualizza i componenti dedicati.

### 5.5 `ContestoLogistico.jsx`

Il componente `ContestoLogistico.jsx` presenta il contesto aziendale e i dati utilizzati per definire l'istanza logistica del Project Work.

Le informazioni visualizzate comprendono:

- Presentazione di Velotto S.r.l. e del settore agroalimentare di riferimento.
- Identificazione del deposito e dei cinque destinatari.
- Quantità simulate da consegnare a ciascun cliente.
- Domanda complessiva espressa in chilogrammi.
- Parametri dei due scenari distributivi.
- Numero e capacità dei veicoli.
- Costi fissi, tariffe chilometriche e costi orari degli autisti.
- Provenienza e caratteristiche delle distanze stradali.

Il componente riceve le informazioni dall'oggetto `data.contesto`, restituito dal backend Flask.

### 5.6 `GrafoPercorsi.jsx`

Il componente `GrafoPercorsi.jsx` rappresenta schematicamente i grafi orientati delle soluzioni ottime individuate dagli algoritmi Python.

Sono visualizzati due scenari:

- **TSP:** percorso ottimo effettuato da un unico veicolo.
- **VRP:** percorsi ottimi dei due furgoni, differenziati mediante colori e stili grafici.

La rappresentazione utilizza elementi SVG per disegnare:

- I nodi del problema, identificati come `D`, `C1`, `C2`, `C3`, `C4` e `C5`.
- Gli archi appartenenti ai percorsi ottimi.
- Le frecce indicanti la direzione di percorrenza.
- I pesi degli archi, espressi in chilometri.
- La distanza complessiva degli scenari.

Le distanze degli archi vengono recuperate dalla proprietà `data.matrice_km`.

La rappresentazione è schematica e non riproduce le coordinate geografiche. La visualizzazione geografica delle strade è invece affidata alla mappa Leaflet.

Il componente non esegue nuove ottimizzazioni: rappresenta i risultati già calcolati dal backend.

### 5.7 `GraficoSensibilita.jsx`

Il componente `GraficoSensibilita.jsx` visualizza i risultati dell'analisi di sensibilità economica attraverso la libreria Recharts.

L'analisi confronta il costo complessivo delle due configurazioni distributive al variare del costo fisso del veicolo unico.

Nel grafico vengono rappresentate:

- La curva del costo complessivo TSP.
- La curva del costo complessivo VRP.
- Il costo fisso TSP sull'asse orizzontale.
- I costi complessivi in euro sull'asse verticale.
- Una linea di riferimento per il costo fisso iniziale del TSP.
- Una legenda e un tooltip per consultare i valori.

Nella simulazione varia soltanto il costo fisso del veicolo unico, mentre gli altri parametri rimangono invariati.

L'intersezione delle curve individua la soglia economica oltre la quale cambia lo scenario più conveniente.

Il componente utilizza i risultati contenuti nell'array `data.sensibilita`, calcolato dal backend Python.

### 5.8 `risultatiSchema.js`

Il file `risultatiSchema.js` definisce lo schema di validazione dei risultati ricevuti dall'API.

La validazione è realizzata mediante la libreria Zod e permette di controllare la struttura dei principali dati utilizzati dalla dashboard.

Lo schema verifica, tra gli altri:

- Le proprietà delle soluzioni TSP e VRP.
- I percorsi e le informazioni sul carico.
- Le distanze complessive.
- Le componenti economiche dei due scenari.
- I risultati dell'analisi di sensibilità.
- La matrice delle distanze, se inclusa nello schema.

Il componente `MainElements.jsx` utilizza lo schema per verificare i dati prima di mostrarli nell'interfaccia.

In caso di validazione non riuscita, la dashboard può attivare lo stato di errore invece di utilizzare dati incompatibili.

Le proprietà aggiuntive mantenute mediante `.passthrough()` non vengono automaticamente validate se non sono dichiarate esplicitamente nello schema.


---

## 6. Comunicazione con il backend

### 6.1 Endpoint utilizzato

Il frontend recupera i dati mediante una richiesta HTTP GET:

```http
GET /api/risultati
```

Esempio di utilizzo:

```javascript
const risposta = await fetch("/api/risultati");
```

L'endpoint deve essere raggiungibile dal browser attraverso l'applicazione Next.js.

Nel caso in cui Flask e Next.js siano eseguiti su porte differenti, è necessaria una configurazione appropriata dell'instradamento delle richieste, ad esempio tramite rewrite o proxy.

Attuale configurazione file `next.config.ts` che svolge il compiti di proxy

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  // Configurazione Tailwind
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Comunicazione con il backend Flask
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:5050/api/:path*",
      },
    ];
  },
};

export default nextConfig;
```

L'eventuale nuova configurazione specifica del proxy deve essere impostata nel relativo file del progetto.

### 6.2 Struttura dei dati

La risposta contiene i risultati necessari alla dashboard.

I principali campi utilizzati sono:

```json
{
  "TSP": {
    "scenario": "veicolo_unico",
    "distanza_totale_km": 46.75,
    "carico_kg": 900,
    "capacita_kg": 1300,
    "percorso": ["D", "C3", "C1", "C2", "C4", "C5", "D"],
    "geometria": {}
  },
  "VRP": {
    "scenario": "due_veicoli",
    "distanza_totale_km": 60.1,
    "furgoni": {
      "furgone1": {
        "carico_kg": 430,
        "distanza_km": 15.83,
        "percorso": ["D", "C2", "C4", "D"],
        "geometria": {}
      },
      "furgone2": {
        "carico_kg": 470,
        "distanza_km": 44.27,
        "percorso": ["D", "C5", "C3", "C1", "D"],
        "geometria": {}
      }
    }
  },
  "costi": {
    "veicolo_unico": {
      "costo_totale_eur": 188.87
    },
    "due_veicoli": {
      "costo_totale_eur": 209.76
    }
  }
}
```

**Nota:** i valori costituiscono un esempio della struttura restituita dal sistema e non devono essere interpretati come risultati immutabili. I campi `geometria` sono qui abbreviati; nella risposta reale contengono dati GeoJSON.

La risposta JSON comprende tutte le informazioni necessarie alla rappresentazione degli scenari logistici e al confronto economico.

Le principali proprietà restituite dal backend sono:

| Proprietà | Descrizione | Componente utilizzatore |
|---|---|---|
| `TSP` | Percorso ottimo, distanza complessiva, carico, capacità del veicolo e geometria stradale | `Row.jsx`, `Table.jsx`, `GrafoPercorsi.jsx` |
| `VRP` | Percorsi ottimi dei due furgoni, distanze, carichi e geometrie stradali | `Row.jsx`, `Table.jsx`, `GrafoPercorsi.jsx` |
| `costi` | Costi fissi, chilometrici, degli autisti e complessivi per entrambi gli scenari | `BoxTableDue.jsx` |
| `sensibilita` | Confronto dei costi complessivi al variare del costo fisso del veicolo unico | `GraficoSensibilita.jsx` |
| `matrice_km` | Matrice direzionale 6 × 6 delle distanze stradali | `GrafoPercorsi.jsx` |
| `contesto` | Informazioni aziendali, destinatari, quantità da consegnare, parametri economici e provenienza delle distanze | `ContestoLogistico.jsx` |

L'oggetto `contesto` contiene le informazioni utilizzate per descrivere l'istanza logistica, distinguendo i dati territoriali dai parametri simulati.

La proprietà `matrice_km` associa a ciascuna coppia di nodi la distanza stradale direzionale, espressa in chilometri.

L'array `sensibilita` contiene, per ogni valore del costo fisso TSP considerato, il costo complessivo dei due scenari e l'indicazione della configurazione economicamente più conveniente.

Tutte queste informazioni sono restituite attraverso lo stesso endpoint `GET /api/risultati`, mantenendo separata la logica di calcolo Python dalla rappresentazione grafica React.

### 6.3 Responsabilità dei livelli

Il backend si occupa di elaborare il problema logistico e produrre i risultati.

Il frontend si occupa di:

- Richiedere i risultati.
- Gestire le risposte HTTP.
- Interpretare la struttura JSON.
- Visualizzare i risultati nelle componenti.
- Consentire la consultazione interattiva della mappa.

Il frontend non esegue autonomamente gli algoritmi TSP e VRP.

---

## 7. Visualizzazione degli indicatori

### 7.1 `Row.jsx`

Organizza i principali indicatori quantitativi in una griglia responsive.

Gli indicatori rappresentati sono:

- Distanza totale TSP.
- Distanza totale VRP.
- Domanda complessiva.
- Numero di destinazioni.

### 7.2 `BoxDataRow.jsx`

È il componente riutilizzabile per rappresentare un singolo indicatore.

Accetta le proprietà:

| Proprietà | Funzione |
|---|---|
| `svg` | Icona associata all'indicatore |
| `title` | Titolo |
| `value` | Valore |
| `subTitle` | Informazione secondaria |
| `customBg` | Colore di sfondo dell'icona |

Questa organizzazione permette di riutilizzare lo stesso elemento grafico per più indicatori.

---

## 8. Visualizzazione dei risultati logistici

### 8.1 `Table.jsx`

Organizza le due aree principali della dashboard.

Utilizza una griglia responsive che prevede:

- Una colonna sugli schermi più piccoli.
- Due colonne a partire dal breakpoint `lg`.

Le due sezioni sono rappresentate da `BoxTableUno` e `BoxTableDue`.

### 8.2 `BoxTableUno.jsx`

Comprende:

1. La mappa dei percorsi.
2. La tabella anagrafica dei nodi.

L'anagrafica contiene le informazioni del deposito e delle cinque destinazioni:

- Codice identificativo.
- Tipologia.
- Nome.
- Comune.
- Indirizzo.

La tabella utilizza un contenitore con scorrimento orizzontale per migliorare la consultazione su smartphone.

Nella versione corrente, i dati anagrafici sono dichiarati direttamente nel componente frontend.

### 8.3 `BoxTableDue.jsx`

Raccoglie tre sezioni informative:

**Confronto scenari:** confronto quantitativo tra TSP e VRP.

**Dettagli percorsi:** rappresentazione delle tappe percorse dai veicoli, delle rispettive distanze e dei carichi.

**Analisi sensibilità:** area informativa relativa ai parametri economici e allo scenario più conveniente.

### 8.4 `TabellaConfronto.jsx`

Rappresenta il confronto tra i due scenari secondo quattro colonne:

1. Indicatore.
2. TSP - Veicolo unico.
3. VRP - Due veicoli.
4. Differenza.

Gli indicatori includono:

- Distanza totale.
- Numero di veicoli.
- Carico totale trasportato.
- Capacità complessiva.

### 8.5 `TspBox.jsx`

Visualizza i dettagli del percorso TSP:

- Sequenza dei nodi.
- Distanza complessiva.
- Carico trasportato.
- Capacità del veicolo.

Il percorso è letto dall'array `data.TSP.percorso`.

### 8.6 `VrpBox.jsx`

Visualizza i dettagli dei due furgoni utilizzati nello scenario VRP.

Per ciascun furgone presenta:

- Identificativo.
- Sequenza delle tappe.
- Distanza percorsa.
- Carico trasportato.

I dati vengono letti dall'oggetto `data.VRP.furgoni`.

### 8.7 `PercorsoTappe.jsx`

È un componente riutilizzabile per rappresentare graficamente una sequenza di nodi.

Riceve un array `percorso` e visualizza le singole tappe con frecce di collegamento.

Le frecce vengono inserite soltanto tra due tappe consecutive, evitando un collegamento dopo l'ultimo nodo.

La gestione degli elementi ripetuti utilizza `Fragment` e la proprietà `key`, come previsto da React.

Nella struttura corrente questo componente è utilizzato da `VrpBox` e `TspBox`.

---

## 9. Sistema cartografico

La rappresentazione geografica è basata su **React Leaflet**, **Leaflet**, **OpenStreetMap** e **GeoJSON**.

### 9.1 `MappaPercorsi.jsx`

Gestisce il caricamento dinamico del componente cartografico.

La mappa viene importata tramite `next/dynamic`, con rendering server-side disabilitato:

```javascript
const MappaLeaflet = dynamic(
  () => import("./MappaLeaflet"),
  {
    ssr: false
  }
);
```

Questa scelta evita di eseguire sul server il rendering di una libreria cartografica che dipende da funzionalità del browser.

Durante il caricamento del modulo viene mostrato un placeholder.

### 9.2 `MappaLeaflet.jsx`

È responsabile della visualizzazione effettiva della mappa.

Riceve dal backend le geometrie dei percorsi TSP e VRP.

Le principali funzionalità sono:

- Visualizzazione della base cartografica OpenStreetMap.
- Disegno delle geometrie GeoJSON.
- Rappresentazione dei nodi mediante marker.
- Identificazione dei nodi tramite tooltip.
- Visualizzazione delle informazioni mediante popup.
- Adattamento iniziale della mappa ai confini geografici del percorso.
- Selezione degli scenari visibili.

### 9.3 Filtri della mappa

L'utente può selezionare tre modalità:

| Modalità | Percorsi visualizzati |
|---|---|
| Tutti | TSP e VRP |
| Solo TSP | Percorso del veicolo unico |
| Solo VRP | Percorsi dei due furgoni |

La modalità selezionata viene memorizzata nello stato React `visualizzazione`.

### 9.4 Distinzione grafica dei percorsi

I percorsi sono rappresentati mediante stili differenti:

- **Verde:** TSP.
- **Blu:** VRP - Furgone 1.
- **Arancione:** VRP - Furgone 2.

Il percorso TSP utilizza una linea continua, mentre i percorsi VRP adottano un tratteggio.

### 9.5 Coordinate geografiche

Le geometrie GeoJSON utilizzano coordinate nel formato:

```text
[longitudine, latitudine]
```

Leaflet utilizza normalmente la rappresentazione:

```text
[latitudine, longitudine]
```

Il componente converte opportunamente l'ordine delle coordinate per costruire i confini della mappa e collocare i marker.

### 9.6 Gestione del caricamento cartografico

Sono previsti due livelli distinti di caricamento:

**Caricamento del componente:** gestito da `MappaPercorsi` durante l'importazione dinamica.

**Caricamento delle tessere:** gestito da `MappaLeaflet` attraverso gli eventi associati a `TileLayer`.

Gli stati utilizzati sono:

- `tileLoading`: indica il caricamento delle tessere.
- `tileError`: registra un errore nel caricamento della cartografia.

In caso di errore delle tessere, la dashboard può mostrare un messaggio informativo senza interrompere necessariamente la visualizzazione delle altre sezioni.

La disponibilità della base cartografica dipende anche dalla connessione Internet e dal servizio esterno utilizzato.

---

## 10. Gestione del caricamento e degli errori

Il frontend distingue tre stati principali della richiesta HTTP.

### 10.1 Caricamento

Quando viene avviata la richiesta al backend, viene attivato lo stato di caricamento.

I componenti utilizzati sono:

- `LoadingRow.jsx`: placeholder degli indicatori superiori.
- `LoadingBoxs.jsx`: placeholder delle sezioni principali della dashboard.

Gli elementi utilizzano un'animazione CSS `animate-pulse` per indicare che i risultati non sono ancora disponibili.

### 10.2 Errore

Se la richiesta non va a buon fine, viene attivato lo stato di errore.

I componenti utilizzati sono:

- `ErrorRow.jsx`: visualizza l'errore nella zona degli indicatori.
- `ErrorBoxs.jsx`: visualizza l'errore nelle aree principali.

Il messaggio viene passato mediante la proprietà `errorMessage`.

In assenza di un messaggio disponibile, i componenti utilizzano una descrizione generica.

### 10.3 Risposta corretta

Quando la richiesta HTTP termina correttamente e la risposta supera la validazione Zod, vengono renderizzati i seguenti componenti:

- `Row.jsx`, per gli indicatori principali.
- `ContestoLogistico.jsx`, per il contesto aziendale e i dati della simulazione.
- `Table.jsx`, per il confronto operativo ed economico e la mappa dei percorsi.
- `GrafoPercorsi.jsx`, per la rappresentazione dei grafi orientati TSP e VRP.
- `GraficoSensibilita.jsx`, per il confronto dei costi al variare del parametro economico selezionato.

I componenti ricevono i risultati attraverso le proprietà React, senza eseguire direttamente gli algoritmi di ottimizzazione.

### 10.4 Gestione degli errori HTTP

La gestione delle risposte non corrette prevede il controllo della proprietà `response.ok`.

Il frontend tenta di leggere il messaggio eventualmente restituito dal backend e, se non disponibile, può utilizzare il codice di stato HTTP.

I principali casi da considerare sono:

| Caso | Comportamento previsto |
|---|---|
| HTTP 200 e dati validi | Visualizzazione della dashboard |
| HTTP 500 | Visualizzazione del messaggio di errore |
| HTTP 404 | Segnalazione della richiesta non riuscita |
| Backend non raggiungibile | Gestione dell'eccezione di rete |
| Risposta JSON non valida | Gestione dell'errore di interpretazione |

### 10.5 Test effettuato

Durante lo sviluppo è stata verificata la gestione di un errore HTTP 500 generato intenzionalmente dal backend Flask.

La verifica ha confermato il seguente flusso:

```text
Backend Flask
     |
     v
HTTP 500 + JSON di errore
     |
     v
Frontend - fetch()
     |
     v
Gestione dell'eccezione
     |
     v
Stato error
     |
     v
ErrorRow + ErrorBoxs
```

### 10.6 Validazione dei risultati mediante Zod

Oltre alla gestione degli errori HTTP, il frontend utilizza Zod per validare la struttura delle informazioni restituite dal backend Flask.

Il controllo viene eseguito nel componente `MainElements.jsx`, prima di memorizzare e visualizzare i risultati.

Il processo comprende:

1. Invio della richiesta HTTP all'endpoint `/api/risultati`.
2. Ricezione e interpretazione della risposta JSON.
3. Verifica dei dati mediante `risultatiSchema.safeParse()`.
4. Memorizzazione dei dati validati in caso di esito positivo.
5. Attivazione dello stato di errore in caso di validazione non riuscita.

La validazione permette di rilevare eventuali incompatibilità tra il formato della risposta Python e quello atteso dai componenti React.

Questo controllo riguarda la struttura dei dati e non sostituisce la verifica della correttezza matematica degli algoritmi TSP e VRP.

---

## 11. Responsive design

Il frontend utilizza Tailwind CSS per adattare la dashboard alle differenti risoluzioni dello schermo.

### Comportamento generale

**Desktop:** visualizzazione degli indicatori su più colonne e organizzazione affiancata dei principali pannelli.

**Tablet:** adattamento della griglia in funzione dello spazio disponibile.

**Smartphone:** disposizione verticale delle sezioni e maggiore utilizzo dello spazio orizzontale disponibile.

### Principali accorgimenti tecnici

- `grid-cols-1` per l'organizzazione su singola colonna.
- `sm:grid-cols-2` per distribuire alcuni indicatori su due colonne.
- `lg:grid-cols-2` per affiancare i pannelli principali.
- `xl:grid-cols-4` per distribuire gli indicatori su quattro colonne.
- `min-w-0` per consentire il ridimensionamento degli elementi.
- `flex-wrap` per gestire gli elementi che devono andare a capo.
- `overflow-x-auto` per consentire lo scorrimento orizzontale delle tabelle.

L'obiettivo è mantenere consultabili i dati anche su dispositivi con larghezza ridotta, evitando che tabelle e percorsi compromettano la larghezza dell'intera pagina.

---

## 12. Installazione e avvio

### 12.1 Prerequisiti

Per eseguire il frontend sono necessari:

- Node.js, in una versione compatibile con Next.js e le dipendenze del progetto.
- Un gestore di pacchetti JavaScript, come npm.
- Il backend Flask configurato e accessibile.
- Una connessione Internet per il caricamento delle tessere OpenStreetMap.

### 12.2 Installazione delle dipendenze

Posizionarsi nella directory frontend:

```bash
cd frontend
```

Installare le dipendenze:

```bash
npm install
```

### 12.3 Avvio in sviluppo

Se lo script `dev` è configurato nel `package.json`, eseguire:

```bash
npm run dev
```

Aprire nel browser l'indirizzo indicato dal terminale Next.js.

### 12.4 Avvio del backend

Prima di utilizzare tutte le funzionalità della dashboard, verificare che il backend Flask sia attivo e che l'endpoint `/api/risultati` sia raggiungibile attraverso la configurazione dell'applicazione.

Le istruzioni dettagliate per l'avvio del backend appartengono alla documentazione del relativo modulo.

### 12.5 Build di produzione

Nel `package.json` sono presenti gli script standard di Next.js, è possibile verificare la compilazione mediante:

```bash
npm run build
```

L'avvio dell'applicazione compilata dipende dalla configurazione di distribuzione e dagli script disponibili.

---

## 13. Test e verifiche

Durante lo sviluppo del frontend sono state affrontate verifiche funzionali relative alle principali caratteristiche della dashboard.

### Verifiche dell'interfaccia

- Visualizzazione della pagina principale.
- Rendering degli indicatori logistici.
- Visualizzazione delle tabelle.
- Visualizzazione dei percorsi TSP e VRP.
- Adattamento degli elementi alle differenti dimensioni dello schermo.

### Verifiche della comunicazione

- Richiesta HTTP al backend.
- Ricezione della risposta JSON.
- Visualizzazione dei risultati ricevuti.
- Intercettazione delle risposte HTTP non corrette.
- Rappresentazione degli stati di caricamento ed errore.

### Verifiche cartografiche

- Rendering del componente Leaflet.
- Visualizzazione delle geometrie GeoJSON.
- Visualizzazione dei nodi geografici.
- Funzionamento dei pulsanti di filtraggio TSP e VRP.
- Gestione del caricamento delle tessere cartografiche.

---