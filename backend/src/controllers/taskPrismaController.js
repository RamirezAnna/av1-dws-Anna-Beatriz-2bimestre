// ========================================
// CONTROLLER - CRUD COM PRISMA CLIENT
// ========================================
import * as TaskModel from '../models/taskPrismaModel.js';

// Listar todas as tarefas
export async function listar(req, res) {
  try {
    const tarefas = await TaskModel.listar();
    res.json(tarefas);
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    res.status(500).json({ erro: 'Erro ao listar tarefas' });
  }
}

// Buscar tarefa por ID
export async function buscarPorId(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }
  try {
    const tarefa = await TaskModel.buscarPorId(id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(tarefa);
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao buscar tarefa' });
  }
}

// Criar nova tarefa
export async function criar(req, res) {
  const { title, description, completed, categoryId } = req.body;
  if (!title) {
    return res.status(400).json({ erro: 'Campo title é obrigatório' });
  }
  try {
    const novaTarefa = await TaskModel.criar({
      title,
      description,
      completed: completed ?? false,
      categoryId: categoryId ?? null
    });
    res.status(201).json(novaTarefa);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao criar tarefa' });
  }
}

// Atualizar tarefa parcialmente
export async function atualizar(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }
  const { title, description, completed, categoryId } = req.body;
  const data = {};
  if (title !== undefined) data.title = title;
  if (description !== undefined) data.description = description;
  if (completed !== undefined) data.completed = completed;
  if (categoryId !== undefined) data.categoryId = categoryId;
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ erro: 'Nenhum campo para atualizar' });
  }
  try {
    const tarefaAtualizada = await TaskModel.atualizar(id, data);
    if (!tarefaAtualizada) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(tarefaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
  }
}

// Excluir tarefa
export async function excluir(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }
  try {
    const tarefaExcluida = await TaskModel.excluir(id);
    if (!tarefaExcluida) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json({ mensagem: 'Tarefa excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    res.status(500).json({ erro: 'Erro ao excluir tarefa' });
  }
}
