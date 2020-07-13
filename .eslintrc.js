module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'import/no-unresolved': 'off',
    'no-use-before-define': 'off',
    'object-shorthand': 'off',
    'comma-dangle': 'off',
    'import/no-dynamic-require': 'off',
    'no-param-reassign': 'off',
    'no-useless-escape': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
};
