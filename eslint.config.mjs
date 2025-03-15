import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin'
import eslintParserTypeScript from '@typescript-eslint/parser'

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypeScript,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Spread the recommended JS rules
      ...eslintPluginTypeScript.configs.recommended.rules, // Spread the recommended TS rules
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
  },
]
