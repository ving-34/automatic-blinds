import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.2.12:5001",
        changeOrigin: true,
      },
      "/mqtt": {
        target: "mqtt://192.168.2.12",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/mqtt/, "");
        },
        ws: true,
      },
    },
  },
  plugins: [react(), legacy()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
