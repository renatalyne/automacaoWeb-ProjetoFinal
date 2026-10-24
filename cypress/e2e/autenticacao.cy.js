
import { criarUsuario } from '../support/dados-usuario';

import {
  acessarPaginaInicial,
  iniciarCadastro,
  preencherDadosCadastro,
  finalizarCadastro,
  realizarLogout,
  realizarLogin,
  excluirConta
} from '../support/automation-exercise';

describe('TC02 - Login com credenciais válidas', () => {

  it('Deve realizar login com sucesso', () => {

    const usuario = criarUsuario();

    // Preparação: cadastrar usuário
    acessarPaginaInicial();
    iniciarCadastro(usuario);
    preencherDadosCadastro(usuario);
    finalizarCadastro(usuario);

    // Encerrar a sessão
    realizarLogout();

    // Executar o login
    realizarLogin(usuario);

    // Limpeza: excluir usuário
    excluirConta();

  });

  

});

describe('TC03 - Login com credenciais inválidas', () => {

  it('Deve apresentar erro ao informar credenciais inválidas', () => {

    cy.visit('https://automationexercise.com');

    cy.contains('a', 'Signup / Login')
      .should('be.visible')
      .click();

    cy.contains('h2', 'Login to your account')
      .should('be.visible');

    cy.get('[data-qa="login-email"]')
      .type(`invalido${Date.now()}@example.com`);

    cy.get('[data-qa="login-password"]')
      .type('SenhaInvalida123', { log: false });

    cy.get('[data-qa="login-button"]')
      .click();

    cy.contains('Your email or password is incorrect!')
      .should('be.visible');

  });

describe('TC04 - Logout de usuário', () => {

  it('Deve realizar logout com sucesso', () => {

    const usuario = criarUsuario();

    // Preparação: criar usuário autenticado
    acessarPaginaInicial();
    iniciarCadastro(usuario);
    preencherDadosCadastro(usuario);
    finalizarCadastro(usuario);

    // Executar logout
    realizarLogout();

    // Validar retorno à tela de login
    cy.contains('h2', 'Login to your account')
      .should('be.visible');

    cy.contains('a', `Logged in as ${usuario.nomeCompleto}`)
      .should('not.exist');

  });

});

});
