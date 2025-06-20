import { Router } from "express";
import { createMaquette, getMaquetteById, getMaquettes, updateMaquette } from "../controllers/maquetteController";

const router = Router();

// create maquette
router.post('/create-maquette',createMaquette);
router.get('/maquettes', getMaquettes);
router.get('/maquette/:id',getMaquetteById);
router.patch('/maquette/:id' , updateMaquette);
export default router;