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
const utils_1 = require("../utils");
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const errors_1 = require("../utils/errors");
const mongoose_1 = __importDefault(require("mongoose"));
class LotController {
    constructor(io) {
        this.getLotById = utils_1.asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!mongoose_1.default.Types.ObjectId.isValid(id))
                return next(new errors_1.HtmlError(422, "Invalid lot id"));
            const lot = yield models_1.LotModel.findById(id).populate('creator', 'name').exec();
            if (!lot)
                return next(new errors_1.HtmlError(404, "Lot not found"));
            return res.json(lot);
        }));
        this.getLots = utils_1.asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const isActive = req.query.active;
            const creator = req.query.creator;
            const participant = req.query.participant;
            const lotsDocQuery = (isActive === 'true') ?
                models_1.LotModel.find({ finishTime: { $gt: Date.now() } }) :
                models_1.LotModel.find();
            if (creator && mongoose_1.default.Types.ObjectId.isValid(creator))
                lotsDocQuery.find({ creator: creator });
            /*
            if(participant &&  mongoose.Types.ObjectId.isValid(participant))
            {
                const bids = await BidModel.find({user: participant}).distinct('lot').exec();
    
                lotsDocQuery.find({_id:bids})
            }*/
            const lots = yield lotsDocQuery.exec();
            if (lots.length === 0)
                return next(new errors_1.HtmlError(404, "Lots not found"));
            const lotsWithMaxBid = yield Promise.all(lots.map((lot) => __awaiter(this, void 0, void 0, function* () {
                const bids = yield models_1.BidModel.find({ lot: lot._id }).sort({ value: -1 }).exec();
                const currentPrice = (bids.length !== 0) ? bids[0].value : lot.startPrice;
                return Object.assign(Object.assign({}, lot.toObject()), { currentPrice });
            })));
            return res.json(lotsWithMaxBid);
        }));
        this.create = utils_1.asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const validation = express_validator_1.validationResult(req);
            if (!validation.isEmpty())
                return res.status(422).json({
                    errors: validation.array()
                });
            const lotDoc = new models_1.LotModel({
                name: req.body.name,
                description: req.body.description,
                creator: req.body.creator,
                startPrice: req.body.startPrice,
                minStep: req.body.minStep,
                finishTime: req.body.finishTime,
                images: req.body.images
            });
            const lot = yield lotDoc.save();
            res.status(201).json(lot);
            this.io.emit('SERVER:LOT_ADDED');
        }));
        this.edit = utils_1.asyncHandler((req, res) => __awaiter(this, void 0, void 0, function* () {
            const validation = express_validator_1.validationResult(req);
            if (!validation.isEmpty())
                return res.status(422).json({
                    errors: validation.array()
                });
            const lot = yield models_1.LotModel.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                description: req.body.description,
                creator: req.body.creator,
                startPrice: req.body.startPrice,
                minStep: req.body.minStep,
                finishTime: req.body.finishTime,
                images: req.body.images
            });
            res.status(200).json(lot);
            this.io.emit('SERVER:LOT_ADDED');
        }));
        this.io = io;
    }
}
exports.default = LotController;
