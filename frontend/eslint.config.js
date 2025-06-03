import hub from "@mindfiredigital/eslint-plugin-hub";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/test/**",
      "**/ui/**",
      "**/util/**",
      "**/type/**",
      "**/hooks/**",
      "**/routes/**",
    ],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      hub: hub,
    },
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "hub/react-filename-pascalcase": "error",
    },
  },
];
