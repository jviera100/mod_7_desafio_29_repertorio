import express from 'express';
import sequelize from '../config/db.js'
import { getProjects, createProjects, updateProjects, deleteProject } from '../controllers/projectController.js';
const router = express.Router();

router.get('/project', getProjects)

router.post('/project', createProjects);

router.put('/project/:id', updateProjects);

router.delete('/project/:id', deleteProject);

export default router