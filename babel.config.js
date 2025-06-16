module.exports = {
    presets: ['babel-preset-gatsby'],
    plugins: ['babel-plugin-styled-components',
    ...((process.env.COVERAGE || process.env.CYPRESS)
    ? [
        [
          'babel-plugin-istanbul',
          {
            exclude: ['node_modules', 'cypress', '.cache', 'public'],
          },
        ],
      ]
    : []),
    ]
}; 