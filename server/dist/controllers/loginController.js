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
exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../prisma");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
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
        const token = (0, generateToken_1.default)(user.id, res);
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
