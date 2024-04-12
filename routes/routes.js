import { Router } from "express"; //importamos express
const router = Router();
import {registrarData, obtenerDataPorFiltro, obtenerData, actualizarData, eliminarData} from "../controllers/queriesDbPool.js"; 


router.get("/", (req, res) => {
  res.send("Hello World!");
});


router.post("/registrarData", registrarData);
router.get("/obtenerDataPorFiltro", obtenerDataPorFiltro);
//localhost:3000/obtenerTodosLosEstudiantes
router.get("/obtenerData", obtenerData);
router.put("/actualizarData", actualizarData);
router.delete("/eliminarData", eliminarData);

export default router;
