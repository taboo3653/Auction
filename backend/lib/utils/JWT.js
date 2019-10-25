"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.verifyJWTToken = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
            if (err || !decodedData) {
                return reject(err);
            }
            resolve(decodedData);
        });
    });
};
exports.generateJWTToken = (data) => {
    const token = jsonwebtoken_1.default.sign({ data }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_MAX_AGE,
        algorithm: 'HS256',
    });
    return token;
};
