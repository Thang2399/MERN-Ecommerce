import { defineConfig } from "cypress";
import fs from 'fs';
import path from 'path';

export default defineConfig({
  e2e: {
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: "http://localhost:4400",
    endpointUrl: 'http://localhost:8800/api',
    setupNodeEvents(on, config) {
      on('task', {
        readCounter() {
          const filePath = path.resolve('cypress/fixtures/counter.json');
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          return data.counter;
        },
        incrementCounter() {
          const filePath = path.resolve('cypress/fixtures/counter.json');
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          data.counter += 1;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          return data.counter;
        }
      });

      return config;
    }
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
