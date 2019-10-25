"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_1 = require("../utils/JWT");
const errors_1 = require("../utils/errors");
exports.default = (req, res, next) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        token = req.headers.authorization.split(' ')[1];
    JWT_1.verifyJWTToken(token)
        .then((user) => {
        req.user = user.data;
        next();
    })
        .catch(() => {
        next(new errors_1.HtmlError(401, "Invalid auth token provided."));
    });
};
