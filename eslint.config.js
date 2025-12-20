const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {
    ignores: ['.next/**'],
  },
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'warn',
      'react/display-name': 'warn',
      'react/jsx-key': 'warn',
      'react/no-unescaped-entities': 'warn',
    },
  },
  {
    files: [
      '**/__tests__/**/*.{js,jsx,ts,tsx}',
      '**/*.{test,spec}.{js,jsx,ts,tsx}',
    ],
    languageOptions: {
      globals: {
        afterAll: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        jest: 'readonly',
      },
    },
  },
];
