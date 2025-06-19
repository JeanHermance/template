import { Request, Response } from "express";
import { ParentService } from "../services/userServices";
import { UserDto } from "../dto/userDto";
import { validate } from "class-validator";
import { AuthentificateRequest } from "../middlewares/authMiddleware";

const userService = new ParentService();

export const registerUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const userDto = Object.assign(new UserDto(), req.body);

        const error = await validate(userDto);
        if (error.length > 0) {
             res.status(400).json(error);
        }else{
            console.log(userDto);
            const user = await userService.register(userDto)
            res.status(201).json(user);
        }
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email , password} = req.body;
        const user = await userService.login(email, password);
        if (!user) {
            res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const {refreshToken} = req.body;
        if (!refreshToken) {
            res.status(400).json({message: "Refresh token is required"});
        }
        const resultat = await userService.refreshToken(refreshToken);
        res.status(200).json(resultat);
    } catch (error: any) {
        res.status(403).json({message: "Invalide Token"})
    
    }
}

export const getProfile = async (req: AuthentificateRequest, res: Response) => {
    const userId = req.userId;
    if (userId) {
        const user = await userService.findOne(+userId);
        if (!user) {
            res.status(404).json({message: "User not found"});
        }
        res.json(user);
    } else {
        res.status(401).json({message: "Unauthorized"})
    }
    
}

export const logoutUser = async (req: AuthentificateRequest, res: Response) => {
    try {
        if (!req.userId) {
            res.status(401).json({message: "Unauthorized"});
        } else {
            await userService.logout(+req.userId);
            res.status(200).json({message: "Logout successfully"})
        }
        
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const getAllUser = async (req: AuthentificateRequest, res: Response) => {
    try {
        const users = await userService.findAll();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.findOne(+req.params.id);
        if (!user) {
            res.status(404).json({message: "User not found"});
        }
            res.status(200).json(user);
        
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userDto: UserDto = req.body;
        const user = await userService.update(+req.params.id, userDto);
        if (!user) {
            res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error});
    }
}