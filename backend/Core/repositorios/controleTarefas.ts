import { TarefaAtualizada } from '../../Dominio/models/ITarefa';
import Tarefa from "../../Frameworks/Sequelize/tarefa";
import { throwTarefaNaoEncontradaError, logErroObterTarefas, logErroAtualizarTarefa, logErroExcluirTarefa } from "../../Dominio/servicos/errors";

export async function obterTodasTarefas(): Promise<Tarefa[]>{
  try {
    const tarefas = await Tarefa.findAll();
    return tarefas;
  } catch (error) {
    logErroObterTarefas(error);
  }
}

export async function atualizarTarefa(tarefaId: number, tarefaAtualizada: TarefaAtualizada): Promise<void> {
  try {
    const result = await Tarefa.update(tarefaAtualizada, {
      where: { id: tarefaId }
    });
    if (result[0] === 0) {
      throwTarefaNaoEncontradaError();
    }
  } catch (error) {
    logErroAtualizarTarefa(error);
  }
}

export async function excluirTarefa(tarefaId: number): Promise<void> {
  try {
    const result = await Tarefa.destroy({
      where: { id: tarefaId }
    });
    if (result === 0) {
      throwTarefaNaoEncontradaError();
    } 
  } catch (error) {
    logErroExcluirTarefa(error);
  }
}