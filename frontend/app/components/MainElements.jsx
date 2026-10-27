"use client";
import { useEffect, useState } from "react";
import { risultatiSchema } from "../lib/risultatiSchema";
import Row from "./Row";
import LoadingRow from "../loadingFolder/LoadingRow";
import ErrorRow from "../errorFolder/ErrorRow";
import Table from "./Table";
import LoadingBoxs from "../loadingFolder/LoadingBoxs";
import ErrorBoxs from "../errorFolder/ErrorBoxs";
import GraficoSensibilita from "./GraficoSensibilita";
import GrafoPercorsi from "./GrafoPercorsi";
import ContestoLogistico from "./ContestoLogistico";

export default function MainElements() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchToBackend = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage(null);

    try {
      const risposta = await fetch("/api/risultati");

      const risultato = await risposta.json().catch(() => null);

      if (!risposta.ok) {
        throw new Error(
          risultato?.error || `Errore backend: HTTP ${risposta.status}`,
        );
      }

      const validazione = risultatiSchema.safeParse(risultato);

      if (!validazione.success) {
        const dettagli = validazione.error.issues
          .slice(0, 3)
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("; ");

        throw new Error(`Dati backend non validi: ${dettagli}`);
      }

      setData(validazione.data);
    } catch (error) {
      console.warn("Errore recupero risultati:", error);

      setError(true);
      setErrorMessage(
        error instanceof Error ? error.message : "Errore sconosciuto",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToBackend();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <LoadingRow />
          <div className="flex flex-wrap md:flex-nowrap gap-4 mt-4">
            <LoadingBoxs />
            <LoadingBoxs />
          </div>
        </>
      ) : error ? (
        <>
          <ErrorRow errorMessage={errorMessage} />
          <div className="flex flex-wrap md:flex-nowrap gap-4 mt-4">
            <ErrorBoxs errorMessage={errorMessage} />
            <ErrorBoxs errorMessage={errorMessage} />
          </div>
        </>
      ) : (
        <>
          <Row TSP={data.TSP} VRP={data.VRP} />
          <ContestoLogistico data={data} />
          <Table data={data} />
          <GrafoPercorsi data={data} />
          <GraficoSensibilita data={data} />
        </>
      )}
    </>
  );
}
