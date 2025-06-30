// babel.config.js (ESM version)
export default {
  presets: [
    "@babel/preset-env", // Transpile modern JS to older versions
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
            modules: 'module', // This is key for Jest to work with CommonJS modules
          },
        ],
      ],
    },
  ],
};
