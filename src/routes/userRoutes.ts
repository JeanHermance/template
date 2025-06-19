import { Router } from "express";
import { getAllUser, getProfile, getUserById, loginUser, logoutUser, refreshToken, registerUser, updateUser } from "../controllers/userController";
import { authentificateToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";
import { RoleEnum } from "../enums/roleEnum";

const router = Router();

// register user
router.post('/register',registerUser);
// sign in
router.post('/login', loginUser);
// refresh token
router.post('/refresh-token', refreshToken);
// logout
router.post('/logout',authentificateToken,logoutUser);
// show profile user
router.get('/profile', authentificateToken , getProfile); 
// edit user
router.get('/user/:id',authentificateToken , authorizeRole(RoleEnum.ADMIN,RoleEnum.AUTHORITY), getUserById )
// lists of user 
router.get('/users', authentificateToken , authorizeRole(RoleEnum.ADMIN,RoleEnum.AUTHORITY) , getAllUser);
// update on user
router.patch('/user/:id',authentificateToken ,updateUser);

export default router;