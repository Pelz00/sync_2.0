import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      // The app is not yet React Compiler-compatible. Keep the standard React
      // hooks checks, but do not fail CI on compiler-advisory findings while
      // legacy client components are incrementally migrated.
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/set-state-in-render': 'off',
      'react-hooks/static-components': 'off',
      // Apostrophes and quotation marks in user-facing copy are intentional.
      'react/no-unescaped-entities': 'off',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Editor local-history snapshots (VS Code Local History) - not real source.
    '.history/**',
  ]),
]);

export default eslintConfig;
