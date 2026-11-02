import js from '@eslint/js';

export default [
  // kode-buruk.js sengaja dilewati; jalankan "npm run lint:buruk" untuk laporan sebelum perbaikan.
  { ignores: ['node_modules/', 'kode-buruk.js'] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        performance: 'readonly',
      },
    },
    rules: {
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
    },
  },
];
