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
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-react-jsx"
  ],
  sourceType: "unambiguous"
}
