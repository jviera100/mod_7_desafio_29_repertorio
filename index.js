import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000

import router from './routes/routes.js';

import setupStaticFolder from './middlewares/staticFolder.js';

// Configuración de la carpeta estática
setupStaticFolder(app);


///middleware
app.use(express.json());//recibe el json y puede ser leido en thunderClient
app.use(express.urlencoded({ extended: false }));//
app.use(router);



app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
