
const seletores = {
  nomeCadastro: '[data-qa="signup-name"]',
  emailCadastro: '[data-qa="signup-email"]',
  botaoCadastro: '[data-qa="signup-button"]',

  generoFeminino: '#id_gender2',
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',

  newsletter: '#newsletter',
  ofertas: '#optin',

  nome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  complemento: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  telefone: '[data-qa="mobile_number"]',

  botaoCriarConta: '[data-qa="create-account"]',
  botaoContinuar: '[data-qa="continue-button"]'
};

export function iniciarCadastro(usuario) {
  cy.contains('a', 'Signup / Login')
    .should('be.visible')
    .click();

  cy.contains('h2', 'New User Signup!')
    .should('be.visible');

  cy.get(seletores.nomeCadastro)
    .type(usuario.nomeCompleto);

  cy.get(seletores.emailCadastro)
    .type(usuario.email);

  cy.get(seletores.botaoCadastro)
    .click();

  cy.contains('b', 'Enter Account Information')
    .should('be.visible');
}

export function preencherDadosCadastro(usuario) {
  cy.get(seletores.generoFeminino).check();

  cy.get(seletores.senha)
    .type(usuario.senha, { log: false });

  cy.get(seletores.diaNascimento).select('15');
  cy.get(seletores.mesNascimento).select('May');
  cy.get(seletores.anoNascimento).select('1995');

  cy.get(seletores.newsletter).check();
  cy.get(seletores.ofertas).check();

  cy.get(seletores.nome).type(usuario.nome);
  cy.get(seletores.sobrenome).type(usuario.sobrenome);

  cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  cy.get(seletores.complemento).type(usuario.complemento);

  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.cep).type(usuario.cep);
  cy.get(seletores.telefone).type(usuario.telefone);
}

export function finalizarCadastro(usuario) {
  cy.get(seletores.botaoCriarConta).click();

  cy.contains('b', 'Account Created!')
    .should('be.visible');

  cy.get(seletores.botaoContinuar).click();

  cy.contains('a', `Logged in as ${usuario.nomeCompleto}`)
    .should('be.visible');
}

export function cadastrarUsuario(usuario) {
  iniciarCadastro(usuario);
  preencherDadosCadastro(usuario);
  finalizarCadastro(usuario);
}

export function excluirConta() {
  cy.contains('a', 'Delete Account').click();

  cy.contains('b', 'Account Deleted!')
    .should('be.visible');

  cy.get(seletores.botaoContinuar).click();
}
