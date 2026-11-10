"use client";

import { useEffect, useState } from "react";

import { type QueueState, readState, takeNumber } from "../lib/api";
import styles from "./page.module.css";

const REFRESH_MS = 3000;

export function Board() {
  const [state, setState] = useState<QueueState | null>(null);
  const [mine, setMine] = useState<number | null>(null);

  useEffect(() => {
    const refresh = () => readState().then(setState);
    refresh();
    const timer = setInterval(refresh, REFRESH_MS);
    return () => clearInterval(timer);
  }, []);

  async function onTake() {
    const ticket = await takeNumber();
    setMine(ticket.number);
    setState(await readState());
  }

  return (
    <main className={styles.page}>
      <section className={styles.now}>
        <p className={styles.label}>Nomor Dipanggil</p>
        <p className={styles.current}>{state?.current ?? "–"}</p>
        <p className={styles.waiting}>{state ? `${state.waiting} menunggu` : "Memuat"}</p>
      </section>

      <section className={styles.next}>
        <p className={styles.label}>Berikutnya</p>
        <ol className={styles.list}>
          {(state?.next ?? []).map((number) => (
            <li key={number} className={styles.chip}>
              {number}
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.take}>
        <button type="button" className={styles.button} onClick={onTake}>
          Ambil Nomor
        </button>
        {mine !== null && <p className={styles.mine}>Nomor kamu {mine}</p>}
      </section>
    </main>
  );
}
