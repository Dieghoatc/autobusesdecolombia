"use client";

import { Gallery } from "./components/gallery/Gallery";
import { Magazine } from "./components/magazine";
import styles from "./Main.module.css";

import Link from "next/link";

export default function Main() {
  return (
    <div>
      <div className={styles.banner}>
        <Link href={`/destinos/medellin`}>
          <h1>Visita la Feria de las Flores Medellín 2025</h1>
          <p>Del 1 al 10 de Agosto</p>
        </Link>
      </div>
      <Magazine />
      <Gallery />
    </div>
  );
}
