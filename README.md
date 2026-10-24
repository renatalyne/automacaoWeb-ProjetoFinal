# Projeto Final — Automação de Testes Web com Cypress

## 1. Sobre o projeto

Este projeto tem como objetivo implementar testes automatizados de interface web utilizando **Cypress**, aplicando boas práticas de organização, reutilização de código, geração de dados dinâmicos, validação de funcionalidades e integração contínua.

A aplicação utilizada para os testes é o [Automation Exercise](https://automationexercise.com/), uma plataforma de demonstração de comércio eletrônico destinada à prática de automação de testes.

O projeto contempla **10 cenários automatizados**, distribuídos entre funcionalidades de autenticação, cadastro, produtos, newsletter e realização de pedidos.

## 2. Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| JavaScript | Linguagem de programação |
| Node.js | Ambiente de execução |
| Cypress 15.21.1 | Automação de testes web |
| Faker 10.6.0 | Geração de dados dinâmicos |
| Mochawesome 8.1.1 | Registro dos resultados dos testes |
| Mochawesome Merge 5.1.1 | Consolidação dos relatórios JSON |
| Mochawesome Report Generator 6.3.2 | Geração do relatório HTML |
| Rimraf 6.1.3 | Limpeza de relatórios anteriores |
| Git e GitHub | Versionamento do projeto |
| GitHub Actions | Integração contínua |

## 3. Cenários automatizados

Foram implementados os seguintes cenários:

| ID | Cenário | Funcionalidade |
|---|---|---|
| TC01 | Cadastrar e excluir usuário | Cadastro |
| TC02 | Realizar login com credenciais válidas | Autenticação |
| TC03 | Validar login com credenciais inválidas | Autenticação |
| TC04 | Realizar logout | Autenticação |
| TC05 | Impedir cadastro com e-mail existente | Cadastro |
| TC08 | Visualizar detalhes de um produto | Produtos |
| TC09 | Pesquisar produtos | Produtos |
| TC10 | Cadastrar e-mail na newsletter | Newsletter |
| TC15 | Realizar pedido após cadastrar usuário | Pedido |
| TC16 | Realizar pedido após fazer login | Pedido |

### Principais validações

**Cadastro e autenticação**
- Cadastro de novos usuários com dados dinâmicos.
- Validação de login válido e inválido.
- Encerramento da sessão.
- Validação de cadastro com e-mail já existente.
- Exclusão de contas criadas durante os testes.

**Produtos**
- Acesso à listagem de produtos.
- Visualização dos detalhes de um produto.
- Pesquisa de produtos e validação da apresentação de resultados.

**Newsletter**
- Preenchimento do e-mail.
- Envio da inscrição.
- Validação da mensagem de confirmação.

**Realização de pedidos**
- Cadastro de usuário antes da compra.
- Autenticação de usuário antes da compra.
- Adição de produto ao carrinho.
- Preenchimento e confirmação do pedido.
- Simulação do pagamento.
- Validação da confirmação do pedido.

## 4. Estrutura do projeto

```text
automacaoWeb-ProjetoFinal/
├── .github/
│   └── workflows/
│       └── testes-automatizados.yml
├── cypress/
│   ├── e2e/
│   │   ├── autenticacao.cy.js
│   │   ├── cadastro.cy.js
│   │   ├── checkout.cy.js
│   │   ├── newsletter.cy.js
│   │   └── produtos.cy.js
│   ├── fixtures/
│   │   └── example.json
│   ├── support/
│   │   ├── automation-exercise.js
│   │   ├── commands.js
│   │   ├── dados-usuario.js
│   │   └── e2e.js
│   └── reports/             # Gerada durante a execução
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

## 5. Organização e reutilização de código

O projeto foi estruturado para separar os cenários de teste das funcionalidades reutilizáveis.

**`cypress/e2e/`**

Contém os arquivos de testes organizados por funcionalidade.

**`cypress/support/automation-exercise.js`**

Centraliza funções reutilizáveis, como:

- Acessar a página inicial.
- Iniciar o cadastro.
- Preencher os dados cadastrais.
- Finalizar o cadastro.
- Excluir a conta.
- Realizar login.
- Realizar logout.

**`cypress/support/dados-usuario.js`**

Utiliza a biblioteca Faker para gerar dados dinâmicos de usuários, reduzindo a dependência de dados fixos.

**`cypress/e2e/checkout.cy.js`**

Contém uma função reutilizável para finalizar pedidos, utilizada nos cenários TC15 e TC16.

## 6. Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Node.js e npm.
- Git.
- Google Chrome.

## 7. Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/automacaoWeb-ProjetoFinal.git
```

Acesse a pasta:

```bash
cd automacaoWeb-ProjetoFinal
```

Instale as dependências:

```bash
npm ci
```

## 8. Execução dos testes

**Executar todos os testes no Chrome:**

```bash
npm test
```

Ou:

```bash
npm run test:e2e
```

**Abrir a interface interativa do Cypress:**

```bash
npx cypress open
```

**Executar um arquivo específico:**

```bash
npx cypress run --browser chrome --spec "cypress/e2e/autenticacao.cy.js"
```

**Executar todos os testes e gerar o relatório HTML:**

```bash
npm run test:report
```

Esse último comando limpa os relatórios anteriores, executa os testes e gera o relatório consolidado quando a execução termina com sucesso.

## 9. Relatórios de testes — Mochawesome

O projeto utiliza o Mochawesome para gerar relatórios de execução.

Durante a execução, os resultados são armazenados em arquivos JSON individuais, que posteriormente são consolidados em um único relatório HTML.

**Gerar o relatório a partir dos resultados existentes:**

```bash
npm run report
```

**Localização do relatório final:**

```text
cypress/reports/relatorio-final.html
```

O relatório permite consultar:

- Quantidade de testes executados.
- Testes aprovados e reprovados.
- Duração da execução.
- Resultados individuais dos cenários.

Os relatórios são ignorados pelo Git e podem ser gerados novamente a qualquer momento.

## 10. Integração contínua — GitHub Actions

O projeto possui um workflow configurado em:

```text
.github/workflows/testes-automatizados.yml
```

A pipeline está preparada para executar os testes automaticamente nas seguintes situações:

- Push nas branches `main` e `develop`.
- Pull request direcionado às branches `main` e `develop`.
- Execução manual pelo GitHub Actions.

### Etapas da pipeline

1. Baixar o código do repositório.
2. Configurar o Node.js 22.
3. Instalar as dependências com `npm ci`.
4. Executar os testes Cypress.
5. Gerar o relatório Mochawesome.
6. Publicar relatórios e evidências como artefatos.

Os artefatos são configurados para permanecer disponíveis por até 30 dias.

**Status:** workflow configurado localmente, aguardando validação da primeira execução no GitHub Actions.

## 11. Resultado da execução local

Na execução completa realizada durante o desenvolvimento, foram obtidos os seguintes resultados:

| Indicador | Resultado |
|---|---|
| Arquivos de teste | 5 |
| Cenários executados | 10 |
| Cenários aprovados | 10 |
| Cenários reprovados | 0 |
| Taxa de aprovação | 100% |
| Tempo total | 3 minutos |

Os resultados correspondem à execução local registrada durante o desenvolvimento e não representam garantia de aprovação em execuções futuras.

## 12. Boas práticas aplicadas

- Organização dos testes por funcionalidade.
- Reutilização de funções para ações comuns.
- Geração de dados dinâmicos com Faker.
- Independência entre cenários de cadastro e compra.
- Validação dos resultados esperados.
- Geração de relatórios HTML.
- Exclusão de arquivos temporários do versionamento.
- Configuração de integração contínua.
- Uso de scripts npm para padronizar a execução.

## 13. Aplicação utilizada

**Automation Exercise**

https://automationexercise.com/

Os testes são realizados em uma aplicação pública de demonstração. A disponibilidade do ambiente e eventuais alterações de interface podem afetar as execuções automatizadas.

---

**Projeto Final de Automação de Testes Web — Cypress e JavaScript.**