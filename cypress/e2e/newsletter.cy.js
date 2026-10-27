import { faker } from '@faker-js/faker';

import {
  acessarPaginaInicial
} from '../support/navegacao';

import {
  assinarNewsletter
} from '../support/newsletter';

describe('TC10 - Assinatura de newsletter', () => {

  it('Deve cadastrar um e-mail na newsletter com sucesso', () => {

    const email = faker.internet.email();

    acessarPaginaInicial();

    assinarNewsletter(email);

  });

});