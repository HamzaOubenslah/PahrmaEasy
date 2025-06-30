// babel.config.js (ESM + CommonJS support for Jest)
export default {
  presets: [
    "@babel/preset-env", // Transpile modern JS to older versions (CommonJS & ESM)
  ],
  plugins: [],
  overrides: [
    {
      test: ['./src/**/*', './backend/**/*'], // This depends on your project structure
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 'current' }, // Ensure it's targeting Node.js version
            modules: 'commonjs', // Transpile ESM to CommonJS for Jest (important)
          },
        ],
      ],
    },
    {
      test: ['./src/**/*.mjs', './backend/**/*.mjs'], // Optional, if you have .mjs files (ESM)
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 'current' }, // Ensure it's targeting Node.js version
            modules: false, // Don't transpile to CommonJS, keep as ESM
          },
        ],
      ],
    },
  ],
};
