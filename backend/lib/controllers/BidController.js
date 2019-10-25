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
class BidController {
    constructor(io) {
        /*
            public getLotById = asyncHandler(async ( req : express.Request, res : express.Response, next: express.NextFunction ) => {
                const id : string = req.params.id;
        
                const lot = await LotModel.findById(id).populate('creator','name -_id').exec();
        
                if(!lot)
                    return next(new HtmlError(404,"Lot not found"));
               
                return res.json(lot);
                
            })
            */
        this.getBids = utils_1.asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const lotId = req.query.lotId;
            if (!mongoose_1.default.Types.ObjectId.isValid(lotId))
                return next(new errors_1.HtmlError(422, "Invalid lot id"));
            const bids = yield models_1.BidModel.find({ lot: lotId }).select('value user').populate('user', 'name').sort({ value: -1 }).exec();
            if (!bids)
                return next(new errors_1.HtmlError(404, "Bids not found"));
            return res.json(bids);
        }));
        this.create = utils_1.asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const validation = express_validator_1.validationResult(req);
            if (!validation.isEmpty())
                return res.status(422).json({
                    errors: validation.array()
                });
            const maxBid = yield models_1.BidModel.find({ lot: req.body.lot }).sort({ value: -1 }).exec();
            const maxVal = (maxBid && maxBid.length > 0) ? Number(maxBid[0].value) : 0;
            const lot = yield models_1.LotModel.findById(req.body.lot).exec();
            if (!lot)
                return next(new errors_1.HtmlError(422, "Lot not found"));
            const minStep = lot.minStep;
            if (Number(req.body.value) < Math.round(maxVal + minStep))
                return next(new errors_1.HtmlError(422, "Too little bid"));
            const bidDoc = new models_1.BidModel({
                value: req.body.value,
                user: req.body.user,
                lot: req.body.lot,
            });
            const bid = yield bidDoc.save();
            res.status(201).json(bid);
            this.io.in(`LOT/${req.body.lot}`).emit('SERVER:BIDS_UPDATED');
        }));
        this.io = io;
    }
}
exports.default = BidController;
