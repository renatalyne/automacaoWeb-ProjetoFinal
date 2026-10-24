
import { faker } from '@faker-js/faker';

import {
  acessarPaginaInicial
} from '../support/automation-exercise';

describe('TC10 - Assinatura de newsletter', () => {

  it('Deve cadastrar um e-mail na newsletter com sucesso', () => {

    const email = faker.internet.email();

    // Acessar a página inicial
    acessarPaginaInicial();

    // Localizar a seção de assinatura
    cy.get('#footer')
      .scrollIntoView();

    // Validar o título
    cy.contains('h2', 'Subscription')
      .should('be.visible');

    // Preencher o e-mail
    cy.get('#susbscribe_email')
      .should('be.visible')
      .type(email);

    // Confirmar assinatura
    cy.get('#subscribe')
      .click();

    // Validar mensagem de sucesso
    cy.contains('You have been successfully subscribed!')
      .should('be.visible');

  });

});
