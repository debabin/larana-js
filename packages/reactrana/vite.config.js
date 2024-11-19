import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react({
      compilerOptions: {
        isCustomElement: (tag) => true,
      },
    }),
    dts({
      tsconfigPath: "./tsconfig.node.json",
    }),
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "Reactrana",
      fileName: (format) => `reactrana.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "larana-js"],
    },
  },
});
