import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";

//todo: sử dụng dotenv để truy cập vào .env tại vite.config
dotenv.config();

export default defineConfig({
  server: {
    proxy: {
      //todo: Set-up proxy with api url start is /api [ fetch("/api/...") = fetch("http://localhost:5000/api/...") ]
      "/api": {
        target: `${process.env.VITE_API_ROUTE}`, //* server url
        secure: true,
      },
    },
    // proxy: {
    //   defineConfig: `${process.env.VITE_API_ROUTE}`,
    // },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
