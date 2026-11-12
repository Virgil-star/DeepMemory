/* The desktop entry: Meridian on its own, with its fonts carried in the bundle
   so nothing is fetched at run time. */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/source-sans-3";
import "@fontsource-variable/source-serif-4";
import "../styles.css";
import { MeridianApp } from "@/components/meridian/meridian-app";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <MeridianApp />
    </StrictMode>,
  );
}
