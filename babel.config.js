module.exports = {
  presets: ['babel-preset-gatsby'],
  plugins: [
    ...((process.env.COVERAGE || process.env.CYPRESS)
      ? [
          [
            'babel-plugin-istanbul',
            {
              exclude: ['node_modules', 'cypress', '.cache', 'public'],
            },
          ],
        ]
      : []
    ),
  ],
};