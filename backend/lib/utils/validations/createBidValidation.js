"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = [
    express_validator_1.check("value", "Invalid value").exists().isInt(),
    express_validator_1.check("user", "Invalid user id").exists().custom((value) => mongoose_1.default.Types.ObjectId.isValid(value)),
    express_validator_1.check("lot", "Invalid lot id").exists().custom((value) => mongoose_1.default.Types.ObjectId.isValid(value))
];
