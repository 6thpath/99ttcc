import jsEslint from '@eslint/js'
import queryPlugin from '@tanstack/eslint-plugin-query'
import tsParser from '@typescript-eslint/parser'
import { defineConfig } from 'eslint/config'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import { flatConfigs as importXPPluginConfigs } from 'eslint-plugin-import-x'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import importSortPlugin from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import { configs as tsEslintConfig } from 'typescript-eslint'

/** @see https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats */
export default defineConfig([
  jsEslint.configs.recommended,
  ...tsEslintConfig.recommendedTypeChecked,
  importXPPluginConfigs.recommended,
  importXPPluginConfigs.typescript,
  prettierPlugin,
  {
    ignores: ['.pnpm-store/', '.vscode/', 'dist/', 'node_modules/', 'source/vite-env.d.ts'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'import-sort': importSortPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@tanstack/query': queryPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: ['tsconfig.json'],
        }),
      ],
      react: {
        pragma: 'React',
        fragment: 'Fragment',
        version: 'detect',
      },
    },
    rules: {
      // ? eslint
      'no-console': ['warn', { allow: ['info', 'debug', 'error', 'warn', 'trace'] }],

      // ? typescript-eslint
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',

      // ? import-sort
      'import-sort/imports': 'warn',
      'import-sort/exports': 'warn',

      // ? import-x
      'import-x/default': 'off',
      'import-x/export': 'warn',
      'import-x/first': 'warn',
      'import-x/newline-after-import': 'warn',
      'import-x/no-absolute-path': ['warn', { esmodule: true, commonjs: true, amd: false }],
      'import-x/no-duplicates': 'warn',
      'import-x/no-named-default': 'warn',
      'import-x/no-webpack-loader-syntax': 'warn',

      // ? react
      ...reactPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      // ? react-hooks
      ...reactHooksPlugin.configs['recommended-latest'].rules,

      // ? react-refresh
      ...reactRefreshPlugin.configs.vite.rules,

      // ? jsx a11y
      ...jsxA11yPlugin.flatConfigs.recommended.rules,
      'jsx-a11y/no-autofocus': 'off',

      // ? react-query
      '@tanstack/query/exhaustive-deps': 'error',
    },
  },
])
