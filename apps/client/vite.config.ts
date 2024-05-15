import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7000",
      },
    },
  },
});
