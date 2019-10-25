"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HtmlError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}
exports.default = HtmlError;
