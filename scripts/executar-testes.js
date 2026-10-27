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

const limpeza = executar('report:clean');

if (limpeza !== 0) {
  process.exit(limpeza);
}

const resultadoTestes = executar('test:e2e');
const resultadoRelatorio = executar('report');

process.exit(resultadoTestes !== 0 ? resultadoTestes : resultadoRelatorio);