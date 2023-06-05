import { Request, Response } from 'express';
import { excluirTarefa } from "../../Core/repositorios";

export const deletarTarefas = async (req: Request, res: Response) => {
  try {
    const tarefaId = Number(req.params.id);
    await excluirTarefa(tarefaId);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};