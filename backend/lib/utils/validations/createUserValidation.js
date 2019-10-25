"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = [
    express_validator_1.check("email", "Недопустимый email").exists().isEmail(),
    express_validator_1.check("name", "Имя слишком короткое или имеет недопустимые символы").exists().custom((value) => (/^[0-9A-Za-z]{3,}$/i.test(value))),
    express_validator_1.check("password", "Пароль слишком короткий или имеет недопустимые символы").exists().custom((value) => (/^[0-9A-Za-z]{3,}$/i.test(value)))
];
