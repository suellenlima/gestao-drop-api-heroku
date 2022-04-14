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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("../config/upload"));
const CreateUserService_1 = __importDefault(require("../services/CreateUserService"));
const UpdateUserAvatarService_1 = __importDefault(require("../services/UpdateUserAvatarService"));
const ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
const usersRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)(upload_1.default);
usersRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService_1.default();
    const user = yield createUser.execute({
        name,
        email,
        password
    });
    delete user.password;
    return response.json(user);
}));
usersRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUserAvatar = new UpdateUserAvatarService_1.default();
    const user = yield updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
    });
    delete user.password;
    return response.json(user);
}));
exports.default = usersRouter;
