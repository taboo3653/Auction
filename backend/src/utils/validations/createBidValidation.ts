import { check } from 'express-validator'
import mongoose from 'mongoose'

export default [
    check("value", "Invalid value").exists().isInt(),
    check("user", "Invalid user id").exists().custom((value) => mongoose.Types.ObjectId.isValid(value)),
    check("lot", "Invalid lot id" ).exists().custom((value) => mongoose.Types.ObjectId.isValid(value))
];
