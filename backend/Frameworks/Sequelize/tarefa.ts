import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

class Tarefa extends Model {
  public id!: number;
  public nome!: string;
  public concluida!: boolean;
  public editando!: boolean;
}

Tarefa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    editando: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'tarefas',
    sequelize,
    timestamps: false, // Desativar 'createdAt' e 'updatedAt'
  }
);

export default Tarefa;