import { atualizarTarefa } from "../../Core/repositorios/controleTarefas";
import { Request, Response } from 'express';

export const atualizarTarefas = async (req: Request, res: Response) => {
  try {
    const tarefaId = Number(req.params.id);
    const tarefaAtualizada = req.body;
    await atualizarTarefa(tarefaId, tarefaAtualizada);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};