import {defineConfig} from 'rolldown';

export default defineConfig({
  input: "src/index.ts",
  platform: "node",
  output: {
    file: "../../build/api-lambda/index.mjs",
    format: "esm",
    inlineDynamicImports: true,
    minify: true,
    sourcemap: true,
  }
});