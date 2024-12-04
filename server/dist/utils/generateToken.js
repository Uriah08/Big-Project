"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "sample";
const generateTokenAndSetCookie = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, {
        expiresIn: '5h'
    });
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 5
    });
    return token;
};
exports.default = generateTokenAndSetCookie;
