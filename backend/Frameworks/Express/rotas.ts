import { criarTarefas } from '../../aplicacao/Controllers/criarTarefas';
import { atualizarTarefas } from '../../aplicacao/Controllers/atualizarTarefas';
import { mostrarTarefas } from '../../aplicacao/Controllers/mostrarTarefas';
import { deletarTarefas } from '../../aplicacao/Controllers/deletarTarefas';

import { Application, Request, Response } from "express";


export function configurarRotas(app: Application) {
  app.get("/tarefas", mostrarTarefas);
  app.post("/tarefas", criarTarefas);
  app.put("/tarefas/:id", atualizarTarefas);
  app.delete("/tarefas/:id", deletarTarefas);
}