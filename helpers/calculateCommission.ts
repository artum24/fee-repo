import { Operation } from "../types/operation";
import { OperationType } from "../constants/operation";
import { CASH_IN, CASH_OUT } from "../constants/commissionFee";
import { UserType } from "../constants/userType";

export const calculateCommission = (operation: Operation, operations: Operation[]): number => {
    const { type, user_type, operation: { amount } } = operation;

    switch (type) {
        case OperationType.CASH_IN: {
            const fee = amount * (CASH_IN.percents / 100);
            return Math.min(fee, CASH_IN.max_fee.amount);
        }
        case OperationType.CASH_OUT: {
            if (user_type === UserType.NATURAL) {
                const weeklyLimit = CASH_OUT.natural.week_limit.amount;
                const weekStartDate = new Date(operation.date);
                weekStartDate.setDate(weekStartDate.getDate() - ((weekStartDate.getDay() + 6) % 7));
                const weekEndDate = new Date(weekStartDate);
                weekEndDate.setDate(weekEndDate.getDate() + 6);

                const previousCashOuts = operations.filter(op =>
                    op.type === OperationType.CASH_OUT &&
                    op.user_id === operation.user_id &&
                    new Date(op.date) >= weekStartDate &&
                    new Date(op.date) <= weekEndDate &&
                    new Date(operation.date) > new Date(op.date) &&
                    op.operation.currency === operation.operation.currency
                );

                const totalCashOutAmount = previousCashOuts.reduce((sum, op) => sum + op.operation.amount, 0);
                if (totalCashOutAmount > weeklyLimit) {
                    return operation.operation.amount * (CASH_OUT.natural.percents / 100);
                } else {
                    return Math.max(0, operation.operation.amount - (weeklyLimit - totalCashOutAmount)) * (CASH_OUT.natural.percents / 100)
                }
            } else {
                let fee = amount * (CASH_OUT.juridical.percents / 100);
                return Math.max(fee, CASH_OUT.juridical.min_fee.amount);
            }
        }
        default: {
            return 0
        }
    }
}
