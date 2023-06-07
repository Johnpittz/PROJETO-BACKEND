import { configsExpress } from "./backend/Frameworks/Express/Express";
import { configurarRotas } from "./backend/Frameworks/Express/rotas";

const app = configsExpress();
configurarRotas(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});