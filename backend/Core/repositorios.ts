import { TarefaAtualizada } from '../Dominio/models/ITarefa';
import Tarefa from "../Frameworks/Sequelize/tarefa";
import { throwTarefaNaoEncontradaError, logErroObterTarefas, logErroAtualizarTarefa, logErroExcluirTarefa } from "../Dominio/servicos/errors";

export async function obterTodasTarefas(): Promise<Tarefa[]>{
  try {
    const tarefas = await Tarefa.findAll();
    return tarefas;
  } catch (error) {
    logErroObterTarefas(error);
  }
}

export async function atualizarTarefa(tarefaId: number, tarefaAtualizada: TarefaAtualizada) {
  try {
    const result = await Tarefa.update(tarefaAtualizada, {
      where: { id: tarefaId }
    });
    if (result[0] === 0) {
      throwTarefaNaoEncontradaError();
    } else {
      console.log("Tarefa atualizada:", tarefaAtualizada);
    }
  } catch (error) {
    logErroAtualizarTarefa(error);
  }
}

export async function excluirTarefa(tarefaId: number) {
  try {
    const result = await Tarefa.destroy({
      where: { id: tarefaId }
    });
    if (result === 0) {
      throwTarefaNaoEncontradaError();
    } else {
      console.log("Tarefa excluída:", tarefaId);
    }
  } catch (error) {
    logErroExcluirTarefa(error);
  }
}