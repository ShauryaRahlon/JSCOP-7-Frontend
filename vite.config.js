import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          three: ["three"],
          motion: ["framer-motion"],
          lucide: ["lucide-react"],
        },
      },
    },
  },

  plugins: [react()],
});
