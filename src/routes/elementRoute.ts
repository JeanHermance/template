import { Router } from "express";
import { createElement, deleteElement, getAllTheme, getElements } from "../controllers/elementController";
import { upload } from "../middlewares/uploads";
import { authentificateToken } from "../middlewares/authMiddleware";

const router = Router();
// create one elementsrc/uploads
router.post('/add-element',authentificateToken, upload.single('valeur'), createElement);
// get all themes
router.get('/get-themes', authentificateToken, getAllTheme);
// get all elements of one themes
router.get('/get-elements/:id', authentificateToken, getElements);
// delete one element
router.delete('/delete-element/:id', deleteElement);

export default router;