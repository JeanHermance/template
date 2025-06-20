import { Router } from "express";
import { authentificateToken } from "../middlewares/authMiddleware";
import { createDevinette, getDevinetteById, getAllDevinettes, updateDevinette } from "../controllers/devinetteController";

const router = Router();
// create on devinete
router.post('/add-devinette',authentificateToken , createDevinette);
// get all devinette
router.get('/get-all-devinette',getAllDevinettes);
// get one devinette
router.get('/get-one-devinette/:id',getDevinetteById);
// update one devinette
router.patch('/get-one-devinette/:id',authentificateToken , updateDevinette);



export default router;