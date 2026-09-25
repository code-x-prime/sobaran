import { globalIgnores } from "eslint/config";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

export default [
  ...nextTs,
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
];
