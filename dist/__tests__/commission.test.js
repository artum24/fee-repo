"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const roundToCents_1 = require("../helpers/roundToCents");
const calculateCommission_1 = require("../helpers/calculateCommission");
const userType_1 = require("../constants/userType");
const operation_1 = require("../constants/operation");
const currency_1 = require("../constants/currency");
jest.spyOn(fs, 'mkdirSync');
describe('calculateCommission function', () => {
    test('should calculate commission correctly for CASH_IN operation', () => {
        const mockOperations = [
            { date: "2016-01-05", user_id: 1, user_type: userType_1.UserType.NATURAL, type: operation_1.OperationType.CASH_IN, operation: { amount: 200.00, currency: currency_1.CURRENCY.EUR } },
        ];
        expect((0, calculateCommission_1.calculateCommission)(mockOperations[0], mockOperations)).toBe(0.06);
    });
    test('should set max fee commission for CASH_IN operation', () => {
        const mockOperations = [
            { date: "2016-01-10", user_id: 2, user_type: userType_1.UserType.NATURAL, type: operation_1.OperationType.CASH_IN, operation: { amount: 1000000.00, currency: currency_1.CURRENCY.EUR } },
        ];
        expect((0, calculateCommission_1.calculateCommission)(mockOperations[0], mockOperations)).toBe(5);
    });
    test('should calculate commission correctly for CASH_OUT operation', () => {
        const mockOperations = [
            { date: "2016-01-06", user_id: 1, user_type: userType_1.UserType.NATURAL, type: operation_1.OperationType.CASH_OUT, operation: { amount: 1000.00, currency: currency_1.CURRENCY.EUR } },
            { date: "2016-01-07", user_id: 1, user_type: userType_1.UserType.NATURAL, type: operation_1.OperationType.CASH_OUT, operation: { amount: 100.00, currency: currency_1.CURRENCY.EUR } },
            { date: "2016-01-10", user_id: 1, user_type: userType_1.UserType.NATURAL, type: operation_1.OperationType.CASH_OUT, operation: { amount: 100.00, currency: currency_1.CURRENCY.EUR } },
        ];
        expect((0, calculateCommission_1.calculateCommission)(mockOperations[0], mockOperations)).toBe(0);
        expect((0, calculateCommission_1.calculateCommission)(mockOperations[1], mockOperations)).toBe(0.3);
    });
});
describe('roundToCents function', () => {
    test('should round amount to two decimal places', () => {
        expect((0, roundToCents_1.roundToCents)(7.85000)).toBe(7.85);
    });
});
