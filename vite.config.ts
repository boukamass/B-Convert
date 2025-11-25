import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: mode === "production" ? {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "BConvert",
      fileName: () => "bundle.js",
      formats: ["es"],
    } : undefined,
    rollupOptions: mode === "production" ? {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "style.css";
          return assetInfo.name || "";
        },
      },
    } : {},
    chunkSizeWarningLimit: 2000,
    outDir: mode === "production" ? "out" : "dist",
  },
}));
