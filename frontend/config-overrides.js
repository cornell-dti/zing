import { useBabelRc, override, addWebpackAlias } from 'customize-cra'
import path from 'path'

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    ['@assets']: path.resolve(__dirname, './src/assets'),
    ['@core']: path.resolve(__dirname, './src/modules/Core'),
    ['@redux']: path.resolve(__dirname, './src/redux'),
    ['@fire']: path.resolve(__dirname, './src/firebase'),
    ['Home']: path.resolve(__dirname, './src/modules/Home'),
    ['EditZing']: path.resolve(__dirname, './src/modules/EditZing'),
    ['Survey']: path.resolve(__dirname, './src/modules/Survey'),
    ['CreateZing']: path.resolve(__dirname, './src/modules/CreateZing'),
    ['Dashboard']: path.resolve(__dirname, './src/modules/Dashboard'),
  })
)
