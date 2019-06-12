module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: "6.10",
          esmodules: true
        }
      }
    ],
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
