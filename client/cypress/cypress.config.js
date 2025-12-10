const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://incidentreportsys.netlify.app",
    supportFile: "cypress/support/e2e.js"
  },
});
