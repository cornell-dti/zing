const { useBabelRc, override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    ['@assets']: path.resolve(__dirname, './src/assets'),
    ['@core']: path.resolve(__dirname, './src/modules/Core'),
    ['Home']: path.resolve(__dirname, './src/modules/Home'),
    ['Survey']: path.resolve(__dirname, './src/modules/Survey'),
  })
)
