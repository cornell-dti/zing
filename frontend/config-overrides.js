const { useBabelRc, override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    ['@assets']: path.resolve(__dirname, './src/assets'),
    ['@core']: path.resolve(__dirname, './src/modules/Core'),
    ['Home']: path.resolve(__dirname, './src/modules/Home'),
    ['Login']: path.resolve(__dirname, './src/modules/Login'),
    ['Survey']: path.resolve(__dirname, './src/modules/Survey'),
    ['CreateGroup']: path.resolve(__dirname, './src/modules/CreateGroup'),
  })
)
