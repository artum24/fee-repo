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
const fs = require("fs");
const commissionFee_1 = require("./constants/commissionFee");
function calculateCommission(operation, operations) {
    const { type, user_type, operation: { amount } } = operation;
    switch (type) {
        case 'cash_in': {
            const fee = amount * (commissionFee_1.CASH_IN.percents / 100);
            return Math.min(fee, commissionFee_1.CASH_IN.max_fee.amount);
        }
        case 'cash_out': {
            if (user_type === 'natural') {
                const weeklyLimit = commissionFee_1.CASH_OUT.natural.week_limit.amount;
                const weekStartDate = new Date(operation.date);
                weekStartDate.setDate(weekStartDate.getDate() - ((weekStartDate.getDay() + 6) % 7)); // Set to Monday
                const weekEndDate = new Date(weekStartDate);
                weekEndDate.setDate(weekEndDate.getDate() + 6); // Set to Sunday
                const previousCashOuts = operations.filter(op => op.type === 'cash_out' &&
                    op.user_id === operation.user_id &&
                    new Date(op.date) >= weekStartDate &&
                    new Date(op.date) <= weekEndDate &&
                    new Date(operation.date) > new Date(op.date) &&
                    op.operation.currency === operation.operation.currency);
                const totalCashOutAmount = previousCashOuts.reduce((sum, op) => sum + op.operation.amount, 0);
                if (totalCashOutAmount > weeklyLimit) {
                    return operation.operation.amount * (commissionFee_1.CASH_OUT.natural.percents / 100);
                }
                else {
                    return Math.max(0, operation.operation.amount - (weeklyLimit - totalCashOutAmount)) * (commissionFee_1.CASH_OUT.natural.percents / 100);
                }
            }
            else {
                let fee = amount * (commissionFee_1.CASH_OUT.juridical.percents / 100);
                return Math.max(fee, commissionFee_1.CASH_OUT.juridical.min_fee.amount);
            }
        }
        default: {
            return 0;
        }
    }
}
function roundToCents(amount) {
    return Math.ceil(amount * 100) / 100;
}
function processOperations(operations) {
    for (const operation of operations) {
        const commission = calculateCommission(operation, operations);
        console.log(roundToCents(commission));
    }
}
const main = (inputFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const input = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));
    processOperations(input);
});
main(process.argv[2]);
