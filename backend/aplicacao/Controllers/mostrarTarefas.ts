import { obterTodasTarefas } from "../../Core/repositorios/controleTarefas";
import { Request, Response } from 'express';

export const mostrarTarefas = async (req: Request, res: Response) => {
  try {
    const tarefas = await obterTodasTarefas();
    res.json(tarefas);
  } catch (error) {
    res.sendStatus(500);
  }
};

