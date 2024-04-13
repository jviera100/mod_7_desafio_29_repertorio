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
}
