# Data — Documentazione e gestione dei dati

## 1. Descrizione

La cartella `data` contiene le informazioni e i dataset utilizzati per lo sviluppo del **Project Work PW23 — Pianificazione e confronto economico dei percorsi di consegna di un'impresa agroalimentare**.

L'obiettivo è organizzare e documentare i dati necessari per rappresentare una rete logistica composta da un deposito e cinque destinatari, utilizzata per l'analisi e l'ottimizzazione dei percorsi di distribuzione.

Il caso di studio prende come riferimento **Velotto S.r.l.**, azienda operante nel commercio all'ingrosso di frutta e ortaggi freschi, con sede legale nel Comune di Napoli.

I dati sono suddivisi in due categorie:

- **Dati reali:** informazioni societarie, attività commerciali, indirizzi e distanze stradali.
- **Dati simulati:** ordini, quantità, capacità dei veicoli e parametri economici utilizzati per lo studio.

Questa distinzione consente di sviluppare un modello logistico realistico senza attribuire alle imprese informazioni operative non documentate.

## 2. Organizzazione della cartella

La struttura prevista è la seguente:

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

Il file conterrà le distanze chilometriche stradali tra il deposito e i cinque destinatari, comprese quelle tra i destinatari stessi.

Le distanze saranno calcolate mediante un servizio di routing stradale, come OSRM basato su OpenStreetMap, documentando la fonte, la data di rilevazione e il criterio di calcolo.

La matrice comprenderà sei nodi:

- `D` — Deposito di riferimento, Napoli.
- `C1` — Volla.
- `C2` — Cercola.
- `C3` — Casoria.
- `C4` — San Giorgio a Cremano.
- `C5` — Portici.

La matrice sarà di dimensione **6 × 6**.

Per ogni rilevazione verranno documentati la distanza, la fonte e il metodo utilizzato. Verranno inoltre considerate eventuali differenze tra percorso di andata e di ritorno dovute alla viabilità.

### 2.5 parametri.json

Il file conterrà i parametri utilizzati per simulare e confrontare le differenti configurazioni logistiche.

I dati previsti comprendono:

- Quantità di prodotti da consegnare a ciascun destinatario.
- Capacità di carico dei veicoli.
- Numero di veicoli disponibili.
- Costi di utilizzo o noleggio dei veicoli.
- Costo chilometrico.
- Costo orario degli autisti.
- Eventuali ulteriori parametri economici.

Le quantità dovranno essere definite in modo che, nello scenario con due veicoli di capacità inferiore, **sia necessario utilizzare entrambi i mezzi**.

I parametri saranno ipotetici e motivati in funzione delle caratteristiche del caso di studio.

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

I dati aziendali sono ricavati da fonti pubbliche, tra cui il Registro delle Imprese e banche dati societarie.

Le localizzazioni dei destinatari sono basate su indirizzi di attività commerciali reali.

Le distanze saranno misurate attraverso un servizio cartografico e documentate.

I valori relativi a ordini, capacità dei veicoli e costi saranno definiti attraverso ipotesi coerenti con il contesto logistico.

## 5. Utilizzo dei dati nel progetto

I dataset presenti nella cartella saranno utilizzati dai componenti applicativi per:

1. Identificare il deposito e i cinque punti di consegna.
2. Costruire il grafo della rete distributiva.
3. Calcolare e confrontare i possibili percorsi.
4. Verificare il rispetto dei vincoli di capacità.
5. Stimare i costi di distribuzione.
6. Visualizzare i risultati attraverso l'interfaccia applicativa.

L'elaborazione dei dati sarà gestita dal backend Python, mentre la rappresentazione grafica dei risultati sarà affidata al frontend.

Per maggiori informazioni sull'implementazione si rimanda alle rispettive documentazioni:

- [Backend](../backend/README.md)
- [Frontend](../frontend/README.md)
- [Documentazione generale](../README.md)

---

**Progetto:** PW23 — Informatica per le Aziende Digitali (L-31)

**Caso di studio:** Velotto S.r.l.

**Area geografica:** Napoli e comuni limitrofi
