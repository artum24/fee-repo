"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCommission = void 0;
const operation_1 = require("../constants/operation");
const commissionFee_1 = require("../constants/commissionFee");
const userType_1 = require("../constants/userType");
const calculateCommission = (operation, operations) => {
    const { type, user_type, operation: { amount } } = operation;
    switch (type) {
        case operation_1.OperationType.CASH_IN: {
            const fee = amount * (commissionFee_1.CASH_IN.percents / 100);
            return Math.min(fee, commissionFee_1.CASH_IN.max_fee.amount);
        }
        case operation_1.OperationType.CASH_OUT: {
            if (user_type === userType_1.UserType.NATURAL) {
                const weeklyLimit = commissionFee_1.CASH_OUT.natural.week_limit.amount;
                const weekStartDate = new Date(operation.date);
                weekStartDate.setDate(weekStartDate.getDate() - ((weekStartDate.getDay() + 6) % 7));
                const weekEndDate = new Date(weekStartDate);
                weekEndDate.setDate(weekEndDate.getDate() + 6);
                const previousCashOuts = operations.filter(op => op.type === operation_1.OperationType.CASH_OUT &&
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
};
exports.calculateCommission = calculateCommission;
