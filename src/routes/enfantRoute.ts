import { Router } from "express";
import { countEnfant, createCompteEnfant, findAllEnfantParent, getProfilEnfant, loginEnfant, logoutEnfant } from "../controllers/enfantController";
import { authentificateToken } from "../middlewares/authMiddleware";
import { authEnfant } from "../middlewares/enfantMiddleware";

const router = Router();
// create compte-enfant
router.post('/create-compte', authentificateToken, createCompteEnfant);
// get all enfants
router.get('/enfants', authentificateToken, findAllEnfantParent);
// count enfants
router.get('/count-enfants', authentificateToken, countEnfant);
// login enfant
router.post('/login-enfant', loginEnfant);
// get profil enfant
router.get('/profil-enfant', authEnfant, getProfilEnfant);
// logout enfant
router.post('/logout-enfant', authEnfant, logoutEnfant);



export default router;