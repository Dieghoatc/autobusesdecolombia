"use client";

import { Magazine } from "./components/magazine/Magazine";
import { Gallery } from "./components/gallery/Gallery";
import { Header } from "@/components/header"
import { Hero } from "./components/hero";
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import Footer from "@/components/footer/Footer";

import "./main.css";

export default function Main() {
  const isMobile = useIsMobile();

  return (
    <div className="main-container">
      <Header />
      {!isMobile ? <Hero /> : " "}
      <Magazine />
      <Gallery />
      <Footer />
    </div>
  );
}
