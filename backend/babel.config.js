export default {
  presets: [
    "@babel/preset-env", // Transpile modern JS to older versions
  ],
  plugins: [
    // Add any necessary plugins here (optional)
  ],
  overrides: [
    {
      test: ["./src/**/*", "./backend/**/*"], // This depends on your project structure
      presets: [
        [
          "@babel/preset-env",
          {
            targets: { node: "current" }, // Ensure it's targeting Node.js version
            modules: "commonJS", // This is key for Jest to work with CommonJS modules
          },
        ],
      ],
    },
  ],
};
