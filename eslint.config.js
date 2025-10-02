import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import promiseLinter from "eslint-plugin-promise";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "libs",
      "docs",
      "deployment",
      "configs",
      "vite.config.ts",
      "vite-env.d.ts",
      "eslint.config.js",
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,

      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
      import: importPlugin,
      prettier: prettierPlugin,
      promise: promiseLinter,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports", // Требует `import type`
          fixStyle: "inline-type-imports",
        },
      ],
      /**
       *| Порядок импортов:
       * 1. node "builtin" modules
       * 2. "external" modules
       * 3. "internal" modules
       * 4. modules from a "parent" directory
       * 5. "sibling" modules from the same or a sibling"s directory
       * 6. "index" of the current directory
       * 7. "object"-imports (only available in TypeScript)
       * 8. "type" imports (only available in Flow and TypeScript)
       * @see https://github.com/import-js/eslint-plugin-import/blob/v2.31.0/docs/rules/order.md
       *
       *| Правила импорта в внутренней группе (internal):
       * 1. Разрешен импорт из директорий и файлов внутри следующих директорий
       ** import { MyBeautifulComponent } from "components/MyBeautifulComponent"
       * Директории:
       * @param app
       * @param assets
       * @param components
       * @param styles
       * @param hooks
       * @param store
       * 2. Разрешен импорт ТОЛЬКО из файла index.ts используемой директории
       ** import { MyBeautifulComponent } from "widgets"
       * Директории:
       * @param router
       * @param utils
       * @param consts
       * @param shared
       * @param widgets
       * @param types
       */
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
            },
            {
              pattern: "*.scss",
              group: "index",
              patternOptions: {
                matchBase: true,
              },
              position: "after",
            },
            {
              pattern: "app/**",
              group: "internal",
            },
            {
              pattern: "assets/**",
              group: "internal",
            },
            {
              pattern: "components/**",
              group: "internal",
            },
            {
              pattern: "router",
              group: "internal",
            },
            {
              pattern: "styles/**",
              group: "internal",
            },
            {
              pattern: "hooks",
              group: "internal",
            },
            {
              pattern: "store",
              group: "internal",
            },
            {
              pattern: "utils",
              group: "internal",
            },
            {
              pattern: "consts",
              group: "internal",
            },
            {
              pattern: "shared",
              group: "internal",
            },
            {
              pattern: "widgets",
              group: "internal",
            },
            {
              pattern: "types",
              group: "index",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: [],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      /**
       * !Проверка на валидные импорты в приложении
       */
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "uikit/**",
                "router/**",
                "utils/**",
                "consts/**",
                "shared/**",
                "widgets/**",
                "types/**",
              ],
              message:
                "Импорт внутренних файлов и директорий недоступен для данного пути. Используйте импорт только напрямую из внешней директории",
            },
          ],
        },
      ],
      /**
       * Используемые правила Eslint
       * @see https://eslint.org/docs/latest/rules/
       */
      "no-use-before-define": [
        "error",
        {
          functions: true,
          classes: true,
          variables: true,
          allowNamedExports: false,
        },
      ],
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "prefer-destructuring": "error",
      "prefer-exponentiation-operator": "error",
      "no-empty": "error",
      curly: "error",
      "no-duplicate-case": "error",
      "default-case": "error",
      "dot-notation": "error",
      "no-alert": "warn",
      "no-else-return": "error",
      "no-empty-function": "warn",
      "no-eval": "error",
      "no-global-assign": "error",
      "no-lone-blocks": "error",
      "no-undef-init": "error",
      "no-undefined": "warn",
      "no-var": "error",
      "operator-assignment": "warn",
      "prefer-object-spread": "error",
      "no-return-assign": "error",
      "no-nested-ternary": "warn",
      "no-template-curly-in-string": "error",
      "no-self-compare": "error",
      "no-self-assign": "error",
      "no-duplicate-imports": "error",
      "no-multi-str": "error",
      "prefer-arrow-callback": "error",
    },
  }
);
