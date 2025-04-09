import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      exclude: ["fs"],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  base: "/", // Crucial for Vercel deployment
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "assets/[name].[hash].js",
      },
    },
  },
  server: {
    historyApiFallback: true, // Important for client-side routing
  },
});
