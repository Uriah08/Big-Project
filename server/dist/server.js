"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// ROUTES IMPORTS //
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const register_routes_1 = __importDefault(require("./routes/register.routes"));
// CONFIGURATIONS //
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// ROUTES //
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// API ROUTES //
app.use('/auth', auth_route_1.default);
app.use('/auth', register_routes_1.default);
// START SERVER //
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});
