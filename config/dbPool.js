import pg from 'pg';
const { Pool } = pg;
// import "dotenv/config";
process.loadEnvFile();


// Configuración de la conexión a la base de datos PostgreSQL
const { DB_HOST, DB_DATABASE, DB_PORT, DB_USER, DB_PASSWORD } = process.env;


const config = {
    host: DB_HOST,    
    database: DB_DATABASE,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,    
    allowExitOnIdle: true, // Si es true, la conexión se cerrará por inactividad

    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    }
}

const pool = new Pool(config);

// // Función asíncrona para conectar a la base de datos
// async function connectDB() {
//   try {
//     await pool.connect();
//     console.log('Conexión exitosa a la base de datos');
//   } catch (error) {
//     console.error('Error al conectar con la base de datos:', error.stack);
//     throw error; // Lanzamos el error para que sea manejado en el código que llame a esta función
//   }
// }

export default pool // se puede exportar el pool o llamarlo db

