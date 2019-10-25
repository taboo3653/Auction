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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const JWT_1 = require("../utils/JWT");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    confirm_hash: String,
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        if (user.isModified('password') || user.isNew) {
            const salt = yield bcrypt_1.default.genSalt(10);
            user.password = yield bcrypt_1.default.hash(user.password, salt);
            user.confirm_hash = yield bcrypt_1.default.hash(new Date().toString() + user.email, salt);
            next();
        }
        else
            return next();
    });
});
UserSchema.methods.comparePasswords = function (pass) {
    const isMatch = bcrypt_1.default.compareSync(pass, this.password || '');
    return isMatch;
};
UserSchema.methods.generateGWT = function () {
    return JWT_1.generateJWTToken({
        _id: this._id,
        email: this.email,
        name: this.name
    });
};
UserSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model('User', UserSchema);
