"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
let transport = nodemailer_1.default.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '1d88b4dde35680',
        pass: '6a1140790a18dc',
    },
});
exports.default = transport;
