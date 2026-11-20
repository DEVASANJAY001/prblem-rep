import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {},
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-firebase-auth": ["firebase/app", "firebase/auth"],
          "vendor-firebase-firestore": ["firebase/firestore"],
          "vendor-firebase-storage": ["firebase/storage"],
          "vendor-three": ["three"],
          "vendor-ui": ["framer-motion", "lucide-react", "canvas-confetti"],
        },
      },
    },
  },
});
