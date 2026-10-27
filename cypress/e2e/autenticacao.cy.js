
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
  let usuario;

  beforeEach(() => {
    cy.env(['SENHA_TESTE']).then(({ SENHA_TESTE }) => {
      usuario = criarUsuario(SENHA_TESTE);

      // Pré-condição: cadastrar um usuário válido
      acessarPaginaInicial();
      cadastrarUsuario(usuario);

      // Encerrar a sessão para iniciar o teste deslogado
      realizarLogout();
    });
  });

  it('Deve realizar login com sucesso', () => {
    // Passos 1 a 3: acessar e validar a página inicial
    acessarPaginaInicial();

    // Passos 4 a 8: realizar login e validar usuário autenticado
    realizarLogin(usuario);

    // Passos 9 e 10: excluir conta e validar exclusão
    excluirConta();
  });
});

describe('TC03 - Login com credenciais inválidas', () => {
  it('Deve exibir mensagem de erro ao tentar login com credenciais inválidas', () => {
    // Passos 1 a 3: acessar e validar a página inicial
    acessarPaginaInicial();

    const emailInvalido = `invalido${Date.now()}@example.com`;
    const senhaInvalida = 'SenhaInvalida123';

    // Passos 4 a 8: tentar login e validar mensagem de erro
    realizarLoginInvalido(emailInvalido, senhaInvalida);
  });
});

describe('TC04 - Logout de usuário', () => {
  let usuario;

  beforeEach(() => {
    cy.env(['SENHA_TESTE']).then(({ SENHA_TESTE }) => {
      usuario = criarUsuario(SENHA_TESTE);

      // Pré-condição: cadastrar um usuário válido
      acessarPaginaInicial();
      cadastrarUsuario(usuario);

      // Deixar o usuário deslogado antes do cenário
      realizarLogout();
    });
  });

  it('Deve realizar logout com sucesso', () => {
    // Passos 1 a 3: abrir e validar a página inicial
    acessarPaginaInicial();

    // Passos 4 a 8: realizar login com credenciais válidas
    realizarLogin(usuario);

    // Passos 9 e 10: realizar logout e validar redirecionamento
    realizarLogout();

    cy.contains('h2', 'Login to your account')
      .should('be.visible');
  });

  afterEach(() => {
    // Limpeza: autenticar novamente e excluir a conta
    // Executada fora do cenário principal
    realizarLogin(usuario);
    excluirConta();
  });
});