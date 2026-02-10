"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";


export default function CalculadoraPage() {
    const [capital, setCapital] = useState(0);
    const [invesMensal, setInvesMensal] = useState(0);
    const [taxa, setTaxa] = useState(0);
    const [tempo, setTempo] = useState(0);
    const [resultado, setResultado] = useState<number | null>(null);
    const [tipoJuros, setTipoJuros] = useState('anual');

    const calcular = () => {
        let i = taxa / 100;
        
        if (i === 0) {
            const montanteTotal = capital + (invesMensal * tempo);
            setResultado(montanteTotal);
            return;
        }

        if (tipoJuros === "anual") {
            i = Math.pow(1 + i, 1 / 12) - 1; // conversão exata
        }

        const montanteCapital = capital * Math.pow(1 + i, tempo);

        const montanteAportes =
            invesMensal * ((Math.pow(1 + i, tempo) - 1) / i);

        const montanteTotal = montanteCapital + montanteAportes;

        setResultado(montanteTotal);
    };

    const formatMoney = (valor: number) => {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };


    const limpar = () => {
        setCapital(0);
        setInvesMensal(0);
        setTaxa(0);
        setTempo(0);
        setTipoJuros('anual');
        setResultado(null);
    };
    

  return (
    <div className={styles.container}>
        <div className={styles.card}>
            <h1 className={styles.title}>Calculadora de Juros Compostos</h1>

            <div className={styles.inputGroup}>
            <label>Capital inicial ($)</label>
            <input
                className={styles.input}
                type="number"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
            />
            </div>

            <div className={styles.inputGroup}>
            <label>Investimento Mensal ($)</label>
            <input
                className={styles.input}
                type="number"
                value={invesMensal}
                onChange={(e) => setInvesMensal(Number(e.target.value))}
            />
            </div>

            <div className={styles.inputGroup}>
            <label>Taxa de juros (%)</label>
            <input
                className={styles.input}
                type="number"   
                value={taxa}
                onChange={(e) => setTaxa(Number(e.target.value))}
            />
            </div>

            <div className={styles.radioGroup}>
            <label>
                <input
                type="radio"
                name="tipoJuros"
                value="anual"
                checked={tipoJuros === "anual"}
                onChange={(e) => setTipoJuros(e.target.value)}
                />
                Anual
            </label>

            <label>
                <input
                type="radio"
                name="tipoJuros"
                value="mensal"
                checked={tipoJuros === "mensal"}
                onChange={(e) => setTipoJuros(e.target.value)}
                />
                Mensal
            </label>
            </div>

            <div className={styles.inputGroup}>
            <label>Tempo (meses)</label>
            <input
                className={styles.input}
                type="number"
                value={tempo}
                onChange={(e) => setTempo(Number(e.target.value))}
            />
            </div>

            <div className={styles.buttonGroup}>
            <button className={styles.primaryButton} onClick={calcular}>
                Calcular
            </button>
            <button className={styles.secondaryButton} onClick={limpar}>
                Limpar
            </button>
            </div>

            {resultado !== null && (
            <div className={styles.result}>
                Montante final: {formatMoney(resultado)}
            </div>
            )}

            <div className={styles.back}>
            <Link href="/">Voltar</Link>
            </div>
        </div>
    </div>
  );
}
