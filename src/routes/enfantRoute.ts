import { Router } from "express";
import { countEnfant, createCompteEnfant, findAllEnfantParent } from "../controllers/enfantController";
import { authentificateToken } from "../middlewares/authMiddleware";

const router = Router();
// create compte-enfant
router.post('/create-compte', authentificateToken, createCompteEnfant);
router.get('/enfants', authentificateToken, findAllEnfantParent);
router.get('/count-enfants', authentificateToken, countEnfant);

export default router;