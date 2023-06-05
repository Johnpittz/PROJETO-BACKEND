import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('joao', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

export default sequelize;