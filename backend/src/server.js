import express from "express";

// Cria a aplicação Express
const app = express();

// Define a porta em que o servidor vai rodar
const PORT = 3000;

// ========================================
// CONFIGURAÇÃO INICIAL
// ========================================

// Permite que o servidor entenda JSON enviado no corpo da requisição
app.use(express.json());

// ========================================
// DADOS EM MEMÓRIA
// ========================================

// Array que armazena as tarefas temporariamente
// Observação importante para os alunos:
// esses dados somem quando o servidor reinicia


// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * Procura o índice de uma tarefa no array com base no id
 * Retorna:
 * - o índice da tarefa, se encontrar
 * - -1, se não encontrar
 */



// ========================================
// INICIALIZAÇÃO DO SERVIDOR
// ========================================

// Faz o servidor começar a escutar a porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
