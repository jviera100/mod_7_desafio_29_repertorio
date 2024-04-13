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
    //el index.js importa archivo staticFolder de carpeta middlewares
    //fijando carpetas estaticas views y assets
    //si hay un html lo muestra en el navegador
    //asi enlazamos desde javascript por index.js a index.html
    //index.html se enlaza con script.js y style.css de carpeta assets (frontend)
    //recordando que index.js tiene la conexion con el servidor y base de datos (backend) 
    //con el MVC (Model-View-Controller o modelo-vista-controlador) todo el backend
    // se enlaza en escala, el index.js importa el middleware que trae en fronted
    // e importa el router.js y este importa los controllers o queries y este importa el config.js
    // es decir la conexion con la base de datos y este importa las variables de entorno de archivo .env 
}
