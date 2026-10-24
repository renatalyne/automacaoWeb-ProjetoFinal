
import { faker } from '@faker-js/faker';

export function criarUsuario() {
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
    }).toLowerCase().replace('@', `.${Date.now()}@`),
    senha: 'Teste@123456',
    empresa: 'Empresa Teste',
    endereco: 'Rua das Flores, 100',
    complemento: 'Apartamento 101',
    pais: 'Canada',
    estado: 'Ontario',
    cidade: 'Toronto',
    cep: 'M5V 2T6',
    telefone: '11999999999'
  };
}
