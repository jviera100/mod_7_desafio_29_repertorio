import Sequelize from 'sequelize';
import 'dotenv/config'

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT
});

//NO es necesario solo es para probar la conexion
/* const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
} */

export default sequelize