// ========================================
// ROTAS - CRUD COM PRISMA CLIENT
// ========================================
import express from 'express';
import * as TaskController from '../controllers/taskPrismaController.js';

const router = express.Router();

// GET /tasks - Listar todas as tarefas
router.get('/tasks', TaskController.listar);

// GET /tasks/:id - Buscar tarefa por ID
router.get('/tasks/:id', TaskController.buscarPorId);

// POST /tasks - Criar nova tarefa
router.post('/tasks', TaskController.criar);

// PUT /tasks/:id - Atualizar tarefa
router.put('/tasks/:id', TaskController.atualizar);

// DELETE /tasks/:id - Excluir tarefa
router.delete('/tasks/:id', TaskController.excluir);

export default router;
