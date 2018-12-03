module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // warn about unused variables, rather than erroring
    'no-unused-vars': 1,
    // to avoid conflict between prettier formatter and standard js linter
    // ref. https://github.com/prettier/prettier/issues/1139
    'space-before-function-paren': 0,
    'no-control-regex': 0,
    quotes: 'off',
    singleQuote: true,
    trailingComma: 'all'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
