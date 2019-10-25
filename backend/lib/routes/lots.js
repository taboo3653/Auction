"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validations_1 = require("../utils/validations");
const lotsRouter = (io) => {
    const lotController = new controllers_1.LotController(io);
    const router = express_1.default.Router();
    router.get('/', lotController.getLots);
    router.get('/:id', lotController.getLotById);
    router.post('/', validations_1.createLotValidation, lotController.create);
    router.put('/:id', validations_1.createLotValidation, lotController.edit);
    return router;
};
exports.default = lotsRouter;
