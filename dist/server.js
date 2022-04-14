"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const routes_1 = __importDefault(require("./routes"));
const upload_1 = __importDefault(require("./config/upload"));
const AppError_1 = __importDefault(require("./errors/AppError"));
require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.directory));
app.use(routes_1.default);
app.use((err, request, response, _) => {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});
dotenv_1.default.config();
app.listen(3333, () => {
    console.log('🐱‍👤 Server started on port 3333');
});
