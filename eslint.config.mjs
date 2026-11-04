import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

// Config ESLint « flat » (ESLint 9) : `next lint` n'existe plus depuis Next 16.
const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Site rédigé en français : les apostrophes dans le JSX (« l'app », « t'abîmer »)
      // s'affichent correctement, la règle n'est que du bruit.
      'react/no-unescaped-entities': 'off',
      // Règles récentes des hooks React (React Compiler) : laissées en avertissement.
      // Elles touchent le bandeau cookies, le formulaire de commande et la boutique :
      // à corriger à part, avec des tests, pas dans un changement d'outillage.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/refs': 'warn',
    },
  },
  {
    // Extrait officiel du pixel Meta et chargement d'Umami, soumis au consentement :
    // on ne réécrit pas ce code pour satisfaire le linter.
    files: ['components/CookieBanner.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-spread': 'warn',
    },
  },
  {
    // Scripts ponctuels exécutés à la main avec Node, hors du site.
    ignores: [
      '.next/**',
      'node_modules/**',
      'next-env.d.ts',
      'scripts/**',
      'test-smtp.js',
      'images_output/**',
      'screenshots/**',
    ],
  },
]

export default eslintConfig
