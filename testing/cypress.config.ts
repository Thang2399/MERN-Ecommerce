import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';


export default defineConfig({
  e2e: {
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: 'http://localhost:4400',
  },
})
