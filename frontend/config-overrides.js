const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
    addWebpackAlias({
        ['@core']: path.resolve(__dirname, './src/modules/Core'),
        ['Home']: path.resolve(__dirname, './src/modules/Home'),
    })
)
