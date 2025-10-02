/// <reference types="vite/client" />
import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const isBuild = mode === "main" || mode === "develop";

  return {
    server: {
      port: 3000,
      // proxy: {
      //   "/api/v1": {
      //     target: env.VITE_PROXY_TARGET || "http://localhost:8080",
      //     changeOrigin: true,
      //   },
      // },
      host: true,
      watch: {
        usePolling: true,
      },
    },
    preview: {
      port: 5000,
      proxy: {
        "/api/v1": {
          target: env.VITE_PROXY_TARGET || "http://localhost:8080",
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
      ViteImageOptimizer({
        png: {
          quality: 50,
        },
        jpeg: {
          quality: 50,
        },
        jpg: {
          quality: 50,
        },
      }),
    ],
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    esbuild: {
      pure: isBuild ? ["console.log"] : [],
      legalComments: "none",
    },
    build: {
      cssMinify: true,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        app: path.resolve(__dirname, "./src/app"),
        assets: path.resolve(__dirname, "./src/assets"),
        components: path.resolve(__dirname, "./src/components"),
        router: path.resolve(__dirname, "./src/router"),
        styles: path.resolve(__dirname, "./src/styles"),
        hooks: path.resolve(__dirname, "./src/hooks"),
        store: path.resolve(__dirname, "./src/store"),
        utils: path.resolve(__dirname, "./src/utils"),
        consts: path.resolve(__dirname, "./src/consts"),
        shared: path.resolve(__dirname, "./src/components/shared"),
        widgets: path.resolve(__dirname, "./src/components/widgets"),
        types: path.resolve(__dirname, "./src/types"),
      },
    },
  };
});
