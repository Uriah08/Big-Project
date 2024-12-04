import jwt from "jsonwebtoken";
import { Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "sample"

const generateTokenAndSetCookie = (userId: string, res: Response) => {
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '5h'
    })

    res.cookie('token', token,{
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 5
    })

    return token
}

export default generateTokenAndSetCookie;