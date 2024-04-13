import { Router } from "express"; //importamos express
const router = Router();

import {registrarData, obtenerDataPorFiltro, obtenerData, actualizarData, eliminarData} from "../controllers/queriesDbPool.js";

router.post("/registrarData", registrarData);
router.get("/obtenerDataPorFiltro/:id", obtenerDataPorFiltro);
router.get("/obtenerData", obtenerData);
router.put("/actualizarData/:id", actualizarData);
router.delete("/eliminarData/:id", eliminarData);

export default router;
