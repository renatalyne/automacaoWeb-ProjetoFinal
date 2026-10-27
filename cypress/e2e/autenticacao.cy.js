
import { criarUsuario } from '../support/dados-usuario';

import { acessarPaginaInicial } from '../support/navegacao';

import {
  cadastrarUsuario,
  excluirConta
} from '../support/cadastro';

import {
  realizarLogin,
  realizarLoginInvalido,
  realizarLogout
} from '../support/autenticacao';

describe('TC02 - Login com credenciais válidas', () => {

  it('Deve realizar login com sucesso', () => {

    cy.env(['SENHA_TESTE']).then(({ SENHA_TESTE }) => {
      const usuario = criarUsuario(SENHA_TESTE);

      // Preparação: cadastrar usuário
      acessarPaginaInicial();
      cadastrarUsuario(usuario);

      // Encerrar a sessão
      realizarLogout();

      // Executar o login
      realizarLogin(usuario);

      // Limpeza: excluir usuário
      excluirConta();
    });

  });

});

describe('TC03 - Login com credenciais inválidas', () => {

  it('Deve apresentar erro ao informar credenciais inválidas', () => {

    acessarPaginaInicial();

    const emailInvalido = `invalido${Date.now()}@example.com`;
    const senhaInvalida = 'SenhaInvalida123';

    realizarLoginInvalido(emailInvalido, senhaInvalida);

  });

});

describe('TC04 - Logout de usuário', () => {

  it('Deve realizar logout com sucesso', () => {

    cy.env(['SENHA_TESTE']).then(({ SENHA_TESTE }) => {
      const usuario = criarUsuario(SENHA_TESTE);

      // Preparação: criar usuário autenticado
      acessarPaginaInicial();
      cadastrarUsuario(usuario);

      // Executar logout
      realizarLogout();

      // Validar retorno à tela de login
      cy.contains('h2', 'Login to your account')
        .should('be.visible');

      cy.contains('a', `Logged in as ${usuario.nomeCompleto}`)
        .should('not.exist');

      // Limpeza: autenticar novamente para excluir a conta
      realizarLogin(usuario);
      excluirConta();
    });

  });

});
