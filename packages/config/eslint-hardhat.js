module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['prettier'],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    mocha: true,
    es2021: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {},
  overrides: [],
  ignorePatterns: ['cache', 'coverage', 'artifacts', '.turbo', 'node_modules', '**/*.json']
};
