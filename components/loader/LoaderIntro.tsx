import "./loader-intro.css";
import abcLogo from "@/assets/singlelogo.png";
import Image from "next/image";

export function LoaderIntro() {
  return (
    <div className="loader-intro_container">
      <div>
        <Image
          src={abcLogo.src}
          alt="autobuses de colombia logo"
          className="abc-logo"
          width={100}
          height={100}
        />
        <h1>Autobuses de Colombia</h1>
      </div>
    </div>
  );
}
