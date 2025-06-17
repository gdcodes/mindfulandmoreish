import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'coverage/junit/cypress-[hash].xml',
    toConsole: false,
    includePending: true
  }
});
