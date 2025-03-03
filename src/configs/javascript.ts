import globals from "globals";
import { interopDefault } from "../utils";
import type { ConfigFn } from "../types";

export type JavascriptConfig = ConfigFn;

export const javascript: JavascriptConfig = async (options = {}) => {
  const pluginUnusedImports = await interopDefault(
    import("eslint-plugin-unused-imports"),
  );

  return [
    {
      name: "eslint/javascript/rules",
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: "readonly",
          navigator: "readonly",
          window: "readonly",
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: "module",
        },
        sourceType: "module",
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      plugins: {
        "unused-imports": pluginUnusedImports,
      },
      rules: {
        "unused-imports/no-unused-imports": "warn",
        "unused-imports/no-unused-vars": [
          "error",
          {
            args: "after-used",
            argsIgnorePattern: "^_",
            vars: "all",
            varsIgnorePattern: "^_",
          },
        ],

        ...options.overrides,
      },
    },
  ];
};
