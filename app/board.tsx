"use client";

import { useEffect, useState } from "react";

import { type QueueState, readState, takeNumber } from "../lib/api";
import styles from "./page.module.css";

const REFRESH_MS = 3000;

export function Board() {
  const [state, setState] = useState<QueueState | null>(null);
  const [mine, setMine] = useState<number | null>(null);
  const [offline, setOffline] = useState(false);
  const [takeFailed, setTakeFailed] = useState(false);

  useEffect(() => {
    const refresh = () =>
      readState()
        .then((fresh) => {
          setState(fresh);
          setOffline(false);
        })
        .catch(() => setOffline(true));
    refresh();
    const timer = setInterval(refresh, REFRESH_MS);
    return () => clearInterval(timer);
  }, []);

  async function onTake() {
    try {
      const ticket = await takeNumber();
      setMine(ticket.number);
      setTakeFailed(false);
      setState(await readState());
    } catch {
      setTakeFailed(true);
    }
  }

  const waitingText = state ? `${state.waiting} menunggu` : offline ? "Belum ada data" : "Memuat";
  const next = state?.next ?? [];

  return (
    <main className={styles.page}>
      {offline && (
        <p role="alert" className={styles.notice}>
          Papan tidak terhubung ke server.{" "}
          {state ? "Angka di bawah mungkin tertinggal. " : ""}
          Mencoba lagi tiap 3 detik.
        </p>
      )}

      <section className={styles.now} data-stale={offline}>
        <p className={styles.label}>Nomor Dipanggil</p>
        <p className={styles.current}>{state?.current ?? "–"}</p>
        <p className={styles.waiting}>{waitingText}</p>
      </section>

      <section className={styles.next} data-stale={offline}>
        <p className={styles.label}>Berikutnya</p>
        {state && next.length === 0 ? (
          <p className={styles.empty}>Belum ada yang menunggu</p>
        ) : (
          <ol className={styles.list}>
            {next.map((number) => (
              <li key={number} className={styles.chip}>
                {number}
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className={styles.take}>
        <button type="button" className={styles.button} onClick={onTake}>
          Ambil Nomor
        </button>
        {takeFailed && (
          <p role="alert" className={styles.error}>
            Nomor belum terambil. Coba lagi sebentar lagi.
          </p>
        )}
        {mine !== null && <p className={styles.mine}>Nomor kamu {mine}</p>}
      </section>
    </main>
  );
}
