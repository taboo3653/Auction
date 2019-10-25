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
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const utils_1 = require("../utils");
const errors_1 = require("../utils/errors");
const mailer_1 = __importDefault(require("../core/mailer"));
class UserController {
    constructor() {
        this.getMe = utils_1.asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.user._id;
            const user = yield models_1.UserModel.findById(id).exec();
            if (!user)
                return next(new errors_1.HtmlError(404, "User not found"));
            res.json(user);
        }));
        this.create = utils_1.asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const validation = express_validator_1.validationResult(req);
            if (!validation.isEmpty())
                return res.status(422).json({
                    errors: validation.array()
                });
            const user = new models_1.UserModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            const data = yield user.save();
            const msg = {
                from: 'admin@test.com',
                to: req.body.email,
                subject: 'Подтверждение почты Auction',
                html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:3000/signup/verify?hash=${user.confirm_hash}">по этой ссылке</a>`,
            };
            mailer_1.default.sendMail(msg);
            res.status(201).json(data);
        }));
        this.verify = utils_1.asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const hash = req.query.hash;
            if (!hash)
                return next(new errors_1.HtmlError(400, "Invalid hash"));
            let user = yield models_1.UserModel.findOne({ confirm_hash: hash }).exec();
            if (!user)
                return next(new errors_1.HtmlError(400, "Invalid hash"));
            user = yield user.save();
            if (user)
                user.confirmed = true;
            res.json({
                message: 'Success!',
            });
        }));
        this.login = utils_1.asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const validation = express_validator_1.validationResult(req);
            if (!validation.isEmpty()) {
                return res.status(422).json({
                    errors: validation.array()
                });
            }
            const email = req.body.email;
            const password = req.body.password;
            const user = yield models_1.UserModel.findOne({ email }).exec();
            if (!user)
                return next(new errors_1.HtmlError(404, "User not found"));
            const isMatch = user.comparePasswords(password);
            if (isMatch) {
                const token = user.generateGWT();
                res.json({
                    token
                });
            }
            else {
                return next(new errors_1.HtmlError(401, "Incorrect password"));
            }
        }));
    }
}
exports.default = UserController;
