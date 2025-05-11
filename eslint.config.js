import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'commonjs',
        ecmaVersion: 'latest',
        project: './tsconfig.json'
      },
      globals: globals.node
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': require('eslint-plugin-simple-import-sort')
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn'
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ]
  }
]);
