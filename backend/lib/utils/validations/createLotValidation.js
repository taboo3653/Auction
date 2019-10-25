"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = [
    express_validator_1.check("name", "Invalid name").exists().isLength({ min: 3 }),
    express_validator_1.check("description", "Invalid description").exists(),
    express_validator_1.check("startPrice", "Invalid startPrice").exists().isInt({ min: 0 }),
    express_validator_1.check("minStep", "Invalid minStep").exists().isInt({ min: 1 }),
];
