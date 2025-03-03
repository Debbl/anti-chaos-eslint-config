import { GLOB_SRC, GLOB_TS, GLOB_TSX } from "src/globs";
import { interopDefault } from "src/utils";
import type { ConfigFn } from "src/types";

export type TypescriptConfig = ConfigFn;

export const typescript: TypescriptConfig = async (options = {}) => {
  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import("@typescript-eslint/eslint-plugin")),
    interopDefault(import("@typescript-eslint/parser")),
  ] as const);

  return [
    {
      name: "eslint/typescript/setup",
      plugins: {
        "@typescript-eslint": pluginTs,
      },
    },
    {
      name: "eslint/typescript/rules",
      files: [GLOB_SRC, GLOB_TS, GLOB_TSX],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: "module",
        },
      },
      rules: {
        ...pluginTs.configs["eslint-recommended"].overrides![0].rules!,
        ...pluginTs.configs.strict.rules!,

        "no-dupe-class-members": "off",
        "no-loss-of-precision": "off",
        "no-redeclare": "off",
        "no-use-before-define": "off",
        "no-useless-constructor": "off",
        "@typescript-eslint/ban-ts-comment": [
          "error",
          { "ts-expect-error": "allow-with-description" },
        ],
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            disallowTypeAnnotations: false,
            fixStyle: "separate-type-imports",
            prefer: "type-imports",
          },
        ],

        // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        "@typescript-eslint/method-signature-style": ["error", "property"],
        "@typescript-eslint/no-dupe-class-members": "error",
        "@typescript-eslint/no-dynamic-delete": "off",
        "@typescript-eslint/no-empty-object-type": [
          "error",
          { allowInterfaces: "always" },
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-invalid-void-type": "off",
        "@typescript-eslint/no-loss-of-precision": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-redeclare": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": [
          "error",
          { classes: false, functions: false, variables: true },
        ],
        "@typescript-eslint/no-useless-constructor": "off",
        "@typescript-eslint/no-wrapper-object-types": "error",
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/unified-signatures": "off",

        ...options.overrides,
      },
    },
  ];
};
