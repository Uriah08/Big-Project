import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";

export const registerUser = async (
    req: Request,
    res: Response
) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            res.status(400).json({
                message: "Email already exists",
                success: false
            });
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: username,
                email,
                image: null,
                password: hashedPassword,
                accounts: {
                    create: [{
                        type: "credentials",
                        provider: "local",
                        providerAccountId: email,
                    }]
                }
            }
        })
        
        res.json({
            message: "User registered successfully",
            user: newUser,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            success: false,
            error
        })
    }
}