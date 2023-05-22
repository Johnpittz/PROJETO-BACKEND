import express from "express";
import { config } from "dotenv";
import pg from "pg";
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

const pool = new pg.Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'joao',
  port: 5432,
});

// Operação GET - Obter todas as tarefas
app.get("/tarefas", (req: Request, res: Response) => {
  pool.query('SELECT * FROM tarefas', (error, result) => {
    if (error) {
      console.error('Erro ao obter as tarefas:', error);
      res.sendStatus(500);
    } else {
      res.json(result.rows);
    }
  });
});

// Operação POST - Adicionar uma nova tarefa
app.post("/tarefas", (req: Request, res: Response) => {
  const novaTarefa = req.body;
  pool.query('INSERT INTO tarefas (nome, concluida, editando) VALUES ($1, $2, $3)', [novaTarefa.nome, novaTarefa.concluida, novaTarefa.editando], (error) => {
    if (error) {
      console.error('Erro ao adicionar nova tarefa:', error);
      res.sendStatus(500);
    } else {
      console.log("Nova tarefa adicionada:", novaTarefa);
      res.sendStatus(201);
    }
  });
});

// Operação PUT - Atualizar uma tarefa existente
app.put("/tarefas/:id", (req: Request, res: Response) => {
  const tarefaId = Number(req.params.id);
  const tarefaAtualizada = req.body;
  pool.query('UPDATE tarefas SET nome = $1, concluida = $2, editando = $3 WHERE id = $4', [tarefaAtualizada.nome, tarefaAtualizada.concluida, tarefaAtualizada.editando, tarefaId], (error, result) => {
    if (error) {
      console.error('Erro ao atualizar a tarefa:', error);
      res.sendStatus(500);
    } else if (result.rowCount === 0) {
      res.sendStatus(404); // Tarefa não encontrada
    } else {
      console.log("Tarefa atualizada:", tarefaAtualizada);
      res.sendStatus(200);
    }
  });
});

// Operação DELETE - Excluir uma tarefa
app.delete("/tarefas/:id", (req: Request, res: Response) => {
  const tarefaId = Number(req.params.id);
  pool.query('DELETE FROM tarefas WHERE id = $1', [tarefaId], (error, result) => {
    if (error) {
      console.error('Erro ao excluir a tarefa:', error);
      res.sendStatus(500);
    } else if (result.rowCount === 0) {
      res.sendStatus(404); // Tarefa não encontrada
    } else {
      console.log("Tarefa excluída:", tarefaId);
      res.sendStatus(204);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});