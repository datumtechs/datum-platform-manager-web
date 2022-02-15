module.exports = {
  presets: [ '@vue/cli-plugin-babel/preset' ],
  // presets: [['es2015', { modules: false }]],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
