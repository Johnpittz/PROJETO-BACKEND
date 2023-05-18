import express from "express";
import { config } from "dotenv";
import { Request, Response, NextFunction, RequestHandler } from 'express';


config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Configuração para CORS
const middleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(middleware);

let tarefas = [];
let nextId = 1;

app.get("/tarefas", (req: Request, res:Response) => {
  res.json(tarefas);
});

app.post("/tarefas", (req:Request, res:Response) => {
  const novaTarefa = req.body;
  novaTarefa.id = nextId;
  nextId++;
  tarefas.push(novaTarefa);
  console.log("Nova tarefa adicionada:", novaTarefa);
  res.sendStatus(201);
});

app.put("/tarefas/:id", (req:Request, res:Response) => {
  const tarefaId = Number(req.params.id);
  const tarefaAtualizada = req.body;
  const tarefaExistente = tarefas.find((tarefa) => tarefa.id === tarefaId);

  if (tarefaExistente) {
    tarefas = tarefas.map((tarefa) =>
      tarefa.id === tarefaId ? tarefaAtualizada : tarefa
    );
    console.log("Tarefa atualizada:", tarefaAtualizada);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/tarefas/:id", (req:Request, res:Response) => {
  const tarefaId = Number(req.params.id);
  tarefas = tarefas.filter((tarefa) => tarefa.id !== tarefaId);
  console.log("Tarefa excluída:", tarefaId);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});