"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validations_1 = require("../utils/validations");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const usersRouter = () => {
    const userController = new controllers_1.UserController();
    const router = express_1.default.Router();
    router.post('/signup', validations_1.createUserValidation, userController.create);
    router.post('/signin', validations_1.loginUserValidation, userController.login);
    router.get('/me', middlewares_1.checkAuth, userController.getMe);
    return router;
};
exports.default = usersRouter;
