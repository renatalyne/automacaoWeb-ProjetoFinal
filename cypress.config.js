require('dotenv').config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  //adicionando tempo de espera para os comandos do Cypress
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: false,
    json: true
  },

 e2e: {
  baseUrl: 'https://automationexercise.com',

  setupNodeEvents(on, config) {
    config.env.SENHA_TESTE = process.env.CYPRESS_SENHA_TESTE;

    if (!config.env.SENHA_TESTE) {
      throw new Error(
        'A variável CYPRESS_SENHA_TESTE não foi configurada no arquivo .env'
      );
    }

    return config;
  },
},
});
