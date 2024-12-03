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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../prisma");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            res.status(400).json({
                message: "Email already exists",
                success: false
            });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield prisma_1.prisma.user.create({
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
        });
        res.json({
            message: "User registered successfully",
            user: newUser,
            success: true
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error registering user",
            success: false,
            error
        });
    }
});
exports.registerUser = registerUser;
