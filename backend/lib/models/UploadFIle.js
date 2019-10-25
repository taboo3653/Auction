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
const UploadFileSchema = new mongoose_1.Schema({
    filename: String,
    size: Number,
    ext: String,
    url: String,
    lot: { type: mongoose_1.Schema.Types.ObjectId, ref: "Lot", require: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", require: true }
}, {
    timestamps: true
});
const UploadFileModel = mongoose_1.default.model('UploadFile', UploadFileSchema);
exports.default = UploadFileModel;
