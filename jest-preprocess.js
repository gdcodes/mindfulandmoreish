const babelOptions = {
  presets: [
    'babel-preset-gatsby',
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ],
};

module.exports = require('babel-jest').createTransformer(babelOptions); 