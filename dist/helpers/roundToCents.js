"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundToCents = void 0;
const roundToCents = (amount) => {
    return Math.ceil(amount * 100) / 100;
};
exports.roundToCents = roundToCents;
