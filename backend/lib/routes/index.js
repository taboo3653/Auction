"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./users"));
const lots_1 = __importDefault(require("./lots"));
const bids_1 = __importDefault(require("./bids"));
const HtmlError_1 = __importDefault(require("../utils/errors/HtmlError"));
const mongoose_1 = __importDefault(require("mongoose"));
const createRoutes = (app, io) => {
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    app.use('/users', users_1.default());
    app.use('/lots', lots_1.default(io));
    app.use('/bids', bids_1.default(io));
    app.use((err, req, res, next) => {
        if (err instanceof HtmlError_1.default)
            return res.status(err.code).json({
                message: err.message
            });
        else if (err instanceof SyntaxError)
            return res.status(400).json({
                message: "Bad request"
            });
        else if (err instanceof mongoose_1.default.Error.ValidationError)
            return res.status(422).json(err);
        else {
            console.error(err.stack);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    });
};
exports.default = createRoutes;
