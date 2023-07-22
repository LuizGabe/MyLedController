import { exec } from 'child_process';

// Função para criar e fechar o processo de teste
function createAndCloseProcess() {
  // Comando para criar um processo (pode ser substituído pelo comando real do seu sistema)
  const command = 'ping 127.0.0.1';

  // Executa o comando para criar o processo
  const testProcess = exec(command);

  console.log('Processo de teste criado.');

  // Fecha o processo após 5 segundos
  setTimeout(() => {
    testProcess.kill();
    console.log('Processo de teste finalizado.');
  }, 5000);
}

export { createAndCloseProcess }
