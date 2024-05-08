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
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.processOperations = void 0;
const fs = require("fs");
const roundToCents_1 = require("./helpers/roundToCents");
const calculateCommission_1 = require("./helpers/calculateCommission");
const processOperations = (operations) => {
    for (const operation of operations) {
        const commission = (0, calculateCommission_1.calculateCommission)(operation, operations);
        console.log((0, roundToCents_1.roundToCents)(commission));
    }
};
exports.processOperations = processOperations;
const main = (inputFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const input = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));
    (0, exports.processOperations)(input);
});
exports.main = main;
(0, exports.main)(process.argv[2]);
