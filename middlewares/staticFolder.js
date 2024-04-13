import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function setupStaticFolder(app) {
    // Middleware para archivos estáticos
    app.use(express.static(path.join(__dirname, '..', 'assets'))); 
    app.use(express.static(path.join(__dirname, '..', 'views')));   
    

    /*con el MVC (Model-View-Controller o modelo-vista-controlador)
    (frontend)
    todo se enlaza en escala, el index.js importa archivo staticFolder de carpeta middlewares,
    que fija carpetas estaticas views y assets, entonces si hay un html dentro de views o assets 
    lo muestra en el navegador, asi enlazamos desde index.js el index.html y este
    se enlaza con script.js y style.css de carpeta assets.
    (backend database)
    index.js levanta el servidor e importa el routes.js que tiene las rutas con cada consulta o queries.
    los controllers o queries tienen las funciones o consultas CRUD y este importan el dbPool.js,
    el dbPool.js es la conexion a la base de datos y este importa las variables de entorno de archivo .env 
    */
}
