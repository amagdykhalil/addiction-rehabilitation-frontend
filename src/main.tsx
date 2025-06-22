import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app";
import "@/app/styles/index.css";
import "@/shared/lib/initI18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
