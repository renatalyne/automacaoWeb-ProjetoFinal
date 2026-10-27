
require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  allowCypressEnv: false,

  // Tempo de espera para os comandos do Cypress
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,

  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',

  // Relatório exigido no trabalho final
  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Relatório de Testes Automatizados - Cypress',
    embeddedScreenshots: true,
    inlineAssets: true,
  },

  e2e: {
    baseUrl: 'https://automationexercise.com',

    setupNodeEvents(on, config) {
      // Registrar o plugin do relatório
      require('cypress-mochawesome-reporter/plugin')(on);

      // Recuperar a senha da variável de ambiente
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
