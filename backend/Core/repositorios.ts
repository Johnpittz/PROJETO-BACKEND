import { TarefaAtualizada } from './../Frameworks/ITarefa';
import Tarefa from "../Frameworks/tarefa";


export async function obterTodasTarefas() {
  try {
    const tarefas = await Tarefa.findAll();
    return tarefas;
  } catch (error) {
    console.error('Erro ao obter as tarefas:', error);
    throw error;
  }
}

export async function atualizarTarefa(tarefaId: number, tarefaAtualizada: TarefaAtualizada) {
  try {
    const result = await Tarefa.update(tarefaAtualizada, {
      where: { id: tarefaId }
    });
    if (result[0] === 0) {
      throw new Error('Tarefa não encontrada');
    } else {
      console.log("Tarefa atualizada:", tarefaAtualizada);
    }
  } catch (error) {
    console.error('Erro ao atualizar a tarefa:', error);
    throw error;
  }
}

export async function excluirTarefa(tarefaId: number) {
  try {
    const result = await Tarefa.destroy({
      where: { id: tarefaId }
    });
    if (result === 0) {
      throw new Error('Tarefa não encontrada');
    } else {
      console.log("Tarefa excluída:", tarefaId);
    }
  } catch (error) {
    console.error('Erro ao excluir a tarefa:', error);
    throw error;
  }
}