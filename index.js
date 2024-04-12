import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000
//import setupStaticFolder from './middlewares/staticFolder.js';
import router from './routes/routes.js';
import {registrarData, obtenerDataPorFiltro, obtenerData, actualizarData, eliminarData} from "./controllers/queriesDbPool.js";

// Configuración de la carpeta estática
//setupStaticFolder(app);

// app.get('/', (req, res) => res.send('Hola CLASE!'))

///middleware
app.use(express.json());//recibe el json y puede ser leido en thunderClient
app.use(express.urlencoded({extended:false}));//
app.use('/', router);



app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))

  const main = async () => {
    const action = process.argv[2]; // Acción a realizar (addUser, getUsers, etc.)
    const args = process.argv.slice(2); // Argumentos para la acción
    switch (action) {
        case 'add': //reclarar funcion o consulta y asi llamra el comando de la consola
            await registrarData(...args);
            break;
        case 'gets':
            await obtenerData();
            break;
        case 'get':
            await obtenerDataPorFiltro(args[1]); //llama data filtrada ya omitiendo 2 slice
            break;
        case 'update':        // Argumentos para la acción
            await actualizarData(args[1], args[2], args[3], args[4]);
            break;
        case 'remove':
            await eliminarData(args[1]);  
            console.log(args); //muestra valores en arreglo          
            break;
        default:
            console.log('Acción no reconocida en index.js espera data por consola, pero ahora es por ruta o formulario'); //espera data por consola
    }
};
main();

//index importa rutas importa query importa config conexion db importa .env