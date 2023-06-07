import { NovaTarefa } from '../models/ITarefa';
import Tarefa from "../../Frameworks/Sequelize/tarefa";

export async function guardarTarefa(novaTarefa: Partial<NovaTarefa>): Promise<Tarefa> {
  try {
    const tarefaCriada = await Tarefa.create(novaTarefa);
    return tarefaCriada;
  } catch (error) {
    console.error('Erro ao adicionar nova tarefa:', error);
    throw error;
  }
}