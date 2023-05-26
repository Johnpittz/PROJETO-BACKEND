import { NovaTarefa } from './../Frameworks/ITarefa';
import Tarefa from "../Frameworks/tarefa";

export async function guardarTarefa(novaTarefa: Partial<NovaTarefa>) {
  try {
    const tarefaCriada = await Tarefa.create(novaTarefa);
    console.log("Nova tarefa adicionada - ID:", tarefaCriada.id);
    console.log("Detalhes da tarefa:", tarefaCriada.toJSON());
    return tarefaCriada;
  } catch (error) {
    console.error('Erro ao adicionar nova tarefa:', error);
    throw error;
  }
}