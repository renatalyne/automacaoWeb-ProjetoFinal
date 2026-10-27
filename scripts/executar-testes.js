
const { spawnSync } = require('node:child_process');

function executar(script) {
  const resultado = spawnSync(
    'npm',
    ['run', script],
    {
      stdio: 'inherit',
      shell: process.platform === 'win32'
    }
  );

  if (resultado.error) {
    throw resultado.error;
  }

  return resultado.status ?? 1;
}

// Limpar relatórios anteriores
const limpeza = executar('report:clean');

if (limpeza !== 0) {
  process.exit(limpeza);
}

// Executar testes Cypress
// O cypress-mochawesome-reporter gera o HTML automaticamente
const resultadoTestes = executar('test:e2e');

// Preservar o resultado da execução dos testes
process.exit(resultadoTestes);