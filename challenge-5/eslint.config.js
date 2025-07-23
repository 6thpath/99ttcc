import jsEslint from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import { defineConfig } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import { flatConfigs as importXPPluginConfigs } from 'eslint-plugin-import-x'
import importSortPlugin from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import { configs as tsEslintConfig } from 'typescript-eslint'

/** @see https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats */
export default defineConfig([
  jsEslint.configs.recommended,
  ...tsEslintConfig.recommendedTypeChecked,
  importXPPluginConfigs.recommended,
  importXPPluginConfigs.typescript,
  prettierConfig,
  {
    ignores: ['.pnpm-store/', '.vscode/', 'dist/', 'node_modules/', 'source/vite-env.d.ts'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'import-sort': importSortPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        projectService: {
          allowDefaultProject: ['eslint.config.js'],
        },
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
    },
    rules: {
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
      'import-x/no-named-as-default-member': 'off',
    },
  },
])
