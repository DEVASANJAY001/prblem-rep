import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { initializeStorage } from "@/lib/storage";

// Handle stale deployment chunk error (Vite dynamic import preload error)
window.addEventListener("vite:preloadError", (event) => {
  console.warn("Vite dynamic chunk preload error detected. Reloading to fetch latest deployment assets...", event);
  const reloadKey = "stuckhere_vite_preload_reload";
  const lastReload = sessionStorage.getItem(reloadKey);
  const now = Date.now();
  if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
    sessionStorage.setItem(reloadKey, now.toString());
    window.location.reload();
  }
});

// Initialize rich seed dataset
initializeStorage();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
