import { defineConfig } from 'cypress';


export default defineConfig({
  e2e: {
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: 'http://localhost:4400',
    setupNodeEvents(on, config) {
      config.apiUrl = 'http://localhost:8800';
      return config;
    },
  },
})
