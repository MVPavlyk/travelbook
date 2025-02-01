import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/', '.next/', 'public/'],
  },
  {
    languageOptions: {
      sourceType: 'module',
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
];
