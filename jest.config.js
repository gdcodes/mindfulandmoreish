module.exports = {
    transform: {
      '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
    },
    moduleNameMapper: {
      '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
      '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/file-mock.js',
    },
    testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
    transformIgnorePatterns: ['node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)'],
    globals: {
      __PATH_PREFIX__: '',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-test-env.js'],
    reporters: [
      'default',
      ['jest-junit', {
        outputDirectory: 'coverage/junit',
        outputName: 'jest-junit.xml',
        includeConsoleOutput: true,
        output: 'coverage/junit/jest-junit.xml',
        suiteName: 'Jest Tests',
        classNameTemplate: '{classname} - {title}',
        titleTemplate: '{classname} - {title}',
        ancestorSeparator: ' > ',
        usePathForSuiteName: 'true'
      }]
    ],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
      '!src/pages/__tests__/**',
      '!src/components/__tests__/**',
      '!**/__mocks__/**',
    ],
}; 