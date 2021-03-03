const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    ['@assets']: path.resolve(__dirname, './src/assets'),
    ['@core']: path.resolve(__dirname, './src/modules/Core'),
    ['Home']: path.resolve(__dirname, './src/modules/Home'),
    ['Survey']: path.resolve(__dirname, './src/modules/Survey'),
  })
)
