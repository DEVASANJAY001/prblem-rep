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
    target: "es2022",
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("src/data/course1Data")) return "course-1-data";
          if (id.includes("src/data/course2Data")) return "course-2-data";
          if (id.includes("src/data/course3Data")) return "course-3-data";
          if (id.includes("src/data/course4Data")) return "course-4-data";
          if (id.includes("src/data/course5Data")) return "course-5-data";
          if (id.includes("src/data/course6Data")) return "course-6-data";
          if (id.includes("src/data/course7Data")) return "course-7-data";
          if (id.includes("src/data/course8Data")) return "course-8-data";
          if (id.includes("src/data/realProductionData")) return "production-data";
          if (id.includes("node_modules/three/")) return "vendor-three";
          if (id.includes("node_modules/firebase/auth/")) return "vendor-firebase-auth";
          if (id.includes("node_modules/firebase/firestore/")) return "vendor-firebase-firestore";
          if (id.includes("node_modules/firebase/storage/")) return "vendor-firebase-storage";
          if (id.includes("node_modules/lucide-react/")) return "vendor-icons";
          if (id.includes("node_modules/framer-motion/")) return "vendor-motion";
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/")
          ) {
            return "vendor-react";
          }
        },
      },
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
});
