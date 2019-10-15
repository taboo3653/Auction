import { check } from 'express-validator'

export default [
    check("name", "Invalid name").exists().isLength({ min: 3 }),
    check("description", "Invalid description").exists().isLength({ min: 3 }),
    check("startPrice", "Invalid startPrice").exists().isInt({ min: 0 }),
    check("currentPrice", "Invalid currentPrice").exists().isInt({ min: 0 }),
    check("minStep", "Invalid minStep").exists().isInt({ min: 1 }),
    check("finishTime", "Invalid finishTime").exists().isInt({min: 0, max: 8640000000000000})
];