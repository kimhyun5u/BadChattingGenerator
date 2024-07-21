import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/content.js"),
        background: resolve(__dirname, "src/background.js"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  publicDir: "public",
  plugins: [
    {
      name: "html-transform",
      transform(code, id) {
        if (id.endsWith(".html")) {
          return {
            code: `export default ${JSON.stringify(code)}`,
            map: null,
          };
        }
      },
    },
  ],
});
