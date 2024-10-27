import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // proxy: {
    ////todo: Set-up proxy with api url start is /api [ fetch("/api/...") = fetch("http://localhost:5000/api/...") ]
    //   "/api": {
    //     target: "http://localhost:5000", //* server url
    //     secure: true,
    //   },
    // },
    proxy: {
      defineConfig: "http://localhost:5000",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
