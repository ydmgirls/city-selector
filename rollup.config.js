import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss";
import pluginTypescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

// Array of extensions to be handled by babel
const EXTENSIONS = [".ts", ".tsx"];

// Excluded dependencies - dev dependencies
const EXTERNAL = Object.keys(pkg.devDependencies);

export default {
  input: ["src/index.tsx"], // What files we build?
  output: {
    dir: "dist", // Directory where rollup.js will put the built files
    sourcemap: true, // We want a source map to trace the original code
    format: "esm", // Built files will follow ES Module format
    preserveModules: true, // This one is important for treeshaking features of our library
  },
  plugins: [
    pluginTypescript(),
    json(),
    commonjs(),
    peerDepsExternal(), // https://rollupjs.org/guide/en/#peer-dependencies
    resolve(), // Resolves node modules
    babel({
      extensions: EXTENSIONS, // Compile our TypeScript files
      babelHelpers: "inline", // Place babel helper functions in the same file they were used
      include: EXTENSIONS.map((ext) => `src/**/*${ext}`),
    }),
    postcss({
      extract: "index.css",
    }),
  ],
  external: EXTERNAL, // https://rollupjs.org/guide/en/#peer-dependencies
};
