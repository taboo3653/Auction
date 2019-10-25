"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validations_1 = require("../utils/validations");
const bidsRouter = (io) => {
    const bidController = new controllers_1.BidController(io);
    const router = express_1.default.Router();
    router.get('/', bidController.getBids);
    // router.get('/:id', bidController.getLotById);
    router.post('/', validations_1.createBidValidation, bidController.create);
    return router;
};
exports.default = bidsRouter;
