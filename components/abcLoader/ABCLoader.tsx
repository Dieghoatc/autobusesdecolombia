import abcLogo from "@/assets/singlelogo.png";
import Image from "next/image";

import styles from "./ABCLoader.module.css";

export function ABCLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src={abcLogo.src}
          alt="autobuses de colombia logo"
          width={100}
          height={100}
        />
      </div>
      <div>
        <h1>Autobuses de Colombia</h1>
      </div>
    </div>
  );
}
