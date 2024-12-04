import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'

import jwt from "jsonwebtoken";

import { prisma } from "../prisma";
import generateTokenAndSetCookie from "../utils/generateToken";

export const loginUser = async (
    req: Request,
    res: Response,
) => {
    const { email, password } = req.body

    if(!password) {
        res.status(400).json({ message: 'Please provide password' , success: false });
        return
    }
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            },
        })
        
        if (!user) {
            res.status(404).json({ message: 'User not found', success: false });
            return
        }

        const { password: userPassword, ...userWithoutPassword } = user;

        if (!userPassword) {
            res.status(400).json({ message: 'Password not provided', success: false });
            return;
        }
        
        const isPasswordValid = await bcryptjs.compare(password, userPassword);
        
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password', success: false });
            return
        }

        const token = generateTokenAndSetCookie(user.id, res)

        res.status(200).json({ message: "Login Successfully" , success: true, token, user: userWithoutPassword })
        
    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            success: false,
            error
        })
    }
}