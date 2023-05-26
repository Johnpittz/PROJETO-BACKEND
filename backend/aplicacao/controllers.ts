import { config } from "dotenv";
import {obterTodasTarefas, atualizarTarefa, excluirTarefa } from "../Core/repositorios";
import { middleware } from "../Frameworks/middlewares";
import { express,Request,Response } from "../Frameworks/Express";
import {guardarTarefa} from "../Dominio/servicos"

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(middleware);

// Operação GET - Obter todas as tarefas
app.get("/tarefas", async (req: Request, res: Response) => {
  try {
    const tarefas = await obterTodasTarefas();
    res.json(tarefas);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Operação POST - Adicionar uma nova tarefa
app.post("/tarefas", async (req: Request, res: Response) => {
  try {
    const novaTarefa = req.body;
    const tarefaCriada = await guardarTarefa(novaTarefa);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Operação PUT - Atualizar uma tarefa existente
app.put("/tarefas/:id", async (req: Request, res: Response) => {
  try {
    const tarefaId = Number(req.params.id);
    const tarefaAtualizada = req.body;
    await atualizarTarefa(tarefaId, tarefaAtualizada);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Operação DELETE - Excluir uma tarefa
app.delete("/tarefas/:id", async (req: Request, res: Response) => {
  try {
    const tarefaId = Number(req.params.id);
    await excluirTarefa(tarefaId);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});