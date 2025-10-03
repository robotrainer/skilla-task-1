/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAIN_SERVICE: string
  readonly VITE_TOKEN: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}