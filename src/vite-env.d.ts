/// <reference types="vite/client" />

declare module '*.png' {
  const value: string;
  export default value;
}

declare interface ImportMeta {
  env: {
    BASE_URL: string;
    [key: string]: string | undefined;
  };
}
