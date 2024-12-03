import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'

import jwt from "jsonwebtoken";

import { prisma } from "../prisma";

const JWT_SECRET = process.env.JWT_SECRET || "sample"

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

        const token = jwt.sign(
            { id: user.id, email: user.email},
            JWT_SECRET,
            { expiresIn: "5h"}
        )

        res.status(200).json({ message: "Login Successfully" , success: true, token, user: userWithoutPassword })
        
    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            success: false,
            error
        })
    }
}

export const protectedRoute = async (
    req: Request,
    res: Response,
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        res.status(401).json({ message: 'No token provided', success: false });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        res.status(200).json({ message: "Access granted", data: decoded, success: true });
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token", success: false });
    }
}