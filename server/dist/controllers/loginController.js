"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../prisma");
const JWT_SECRET = process.env.JWT_SECRET || "sample";
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!password) {
        res.status(400).json({ message: 'Please provide password', success: false });
        return;
    }
    try {
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                email
            },
        });
        if (!user) {
            res.status(404).json({ message: 'User not found', success: false });
            return;
        }
        const { password: userPassword } = user, userWithoutPassword = __rest(user, ["password"]);
        if (!userPassword) {
            res.status(400).json({ message: 'Password not provided', success: false });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, userPassword);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password', success: false });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "5h" });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 5,
            path: '/',
            sameSite: 'strict',
        });
        res.status(200).json({ message: "Login Successfully", success: true, token, user: userWithoutPassword });
    }
    catch (error) {
        res.status(500).json({
            message: "Error registering user",
            success: false,
            error
        });
    }
});
exports.loginUser = loginUser;
const protectedRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided', success: false });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        res.status(200).json({ message: "Access granted", data: decoded, success: true });
    }
    catch (error) {
        res.status(401).json({ error: "Invalid or expired token", success: false });
    }
});
exports.protectedRoute = protectedRoute;
