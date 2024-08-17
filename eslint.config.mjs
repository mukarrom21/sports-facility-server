import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, prettierConfig, {
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    "no-console": "warn",
    "no-undef": "error",
    "no-unused-vars": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "@typescript-eslint/no-explicit-any": "warn",
  },
});
