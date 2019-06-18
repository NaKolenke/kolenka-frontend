module.exports = {
  presets: [
    [
      '@vue/app',
      { 
        useBuiltIns: "entry"
      }
    ]
  ],
  plugins: [ 
    "@babel/plugin-proposal-object-rest-spread" 
  ],
  sourceType: "unambiguous"
}
