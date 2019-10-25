"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const BidSchema = new mongoose_1.Schema({
    value: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    lot: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Lot",
        required: true,
        index: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Bid', BidSchema);
