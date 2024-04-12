import express from 'express';
import routes from './routes/projectRoutes.js';
const app = express();



const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Routes
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}`);
})
