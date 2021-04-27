module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "import/extensions": 0,
    quotes: ["error", "double"],
    "no-param-reassign": ["error", { props: false }],
    "max-len": 0,
  },
};
