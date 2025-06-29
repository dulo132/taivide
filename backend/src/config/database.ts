import { Sequelize } from 'sequelize';

const dialect = (process.env.DB_DIALECT as any) || 'postgres';

let sequelize: Sequelize;

if (dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_NAME || 'taivideonhanh_test.db',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  });
} else {
  sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST!,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  });
}

export default sequelize;