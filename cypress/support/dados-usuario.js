import { faker } from '@faker-js/faker';

export function criarUsuario(senha) {
  const nome = faker.person.firstName();
  const sobrenome = faker.person.lastName();

  return {
    nome,
    sobrenome,
    nomeCompleto: `${nome} ${sobrenome}`,
    email: faker.internet.email({
      firstName: nome,
      lastName: sobrenome,
      provider: 'example.com'
    }).toLowerCase().replace('@', `.${faker.string.uuid()}@`),
    senha: senha,
    empresa: 'Empresa Teste',
    endereco: 'Rua das Flores, 100',
    complemento: 'Apartamento 101',
    pais: 'Canada',
    estado: 'Ontario',
    cidade: 'Toronto',
    cep: 'M4B 1B3',
    telefone: '416999-9999'
  };
}