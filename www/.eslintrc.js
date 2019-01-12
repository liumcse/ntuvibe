module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: "babel-eslint",
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier", "prettier/react",],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 7,
    sourceType: "module"
  },
  plugins: ["react", "prettier", "json"],
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    eqeqeq: 'error',
    "no-console": 0,
    "react/display-name" : 0,
    "react/no-unescaped-entities": 0,

    // Prettier
    "prettier/prettier": "error",
    "no-tabs": "error",
    "max-depth": ["error", { max: 3 }],
    "max-statements": ["error", { max: 20 }],
    complexity: "error",
    "max-params": ["error", { max: 4 }],
    "max-nested-callbacks": ["error", { max: 3 }]
  }
};
