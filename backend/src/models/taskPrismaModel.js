// ========================================
// MODEL - CRUD COM PRISMA CLIENT
// ========================================
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Listar todas as tarefas
export async function listar() {
  try {
    return await prisma.task.findMany({ include: { category: true } });
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    throw error;
  }
}

// Buscar tarefa por ID
export async function buscarPorId(id) {
  try {
    return await prisma.task.findUnique({ where: { id: Number(id) }, include: { category: true } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    console.error('Erro ao buscar tarefa:', error);
    throw error;
  }
}

// Criar nova tarefa
export async function criar(data) {
  try {
    return await prisma.task.create({ data });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }
}

// Atualizar tarefa parcialmente
export async function atualizar(id, data) {
  try {
    return await prisma.task.update({ where: { id: Number(id) }, data });
  } catch (error) {
    if (error.code === 'P2025') return null;
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
}

// Excluir tarefa
export async function excluir(id) {
  try {
    return await prisma.task.delete({ where: { id: Number(id) } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    console.error('Erro ao excluir tarefa:', error);
    throw error;
  }
}
