const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://javan.co.id',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
