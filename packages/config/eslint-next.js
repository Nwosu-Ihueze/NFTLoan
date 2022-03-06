module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  env: {
    node: true,
    es2020: true,
    browser: true,
    commonjs: true
  },
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': 'warn',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off'
  },
  plugins: [],
  overrides: [],
  ignorePatterns: ['out', 'dist', '.next', '.turbo', 'public', 'node_modules', '**/*.json']
};
