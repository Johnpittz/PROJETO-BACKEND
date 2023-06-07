import { guardarTarefa } from "../../Dominio/servicos/UseCase";
import { Request, Response } from 'express';

export const criarTarefas = async (req: Request, res: Response) => {
  try {
    const novaTarefa = req.body;
    const tarefaCriada = await guardarTarefa(novaTarefa);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};