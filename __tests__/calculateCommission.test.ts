import { Operation } from '../types/operation';
import { UserType } from '../constants/userType';
import { OperationType } from '../constants/operation';
import { CURRENCY } from '../constants/currency';
import { calculateCommission } from '../helpers/calculateCommission';

describe('calculateCommission function', () => {
    test('should calculate commission correctly for CASH_IN operation', () => {
        const mockOperations: Operation[] = [
            { date: "2016-01-05", user_id: 1, user_type: UserType.NATURAL, type: OperationType.CASH_IN, operation: { amount: 200.00, currency: CURRENCY.EUR } },
        ]
        expect(calculateCommission(mockOperations[0], mockOperations)).toBe(0.06)
    });

    test('should set max fee commission for CASH_IN operation', () => {
        const mockOperations: Operation[] = [
            { date: "2016-01-10", user_id: 2, user_type: UserType.NATURAL, type: OperationType.CASH_IN, operation: { amount: 1000000.00, currency: CURRENCY.EUR } },
        ]
        expect(calculateCommission(mockOperations[0], mockOperations)).toBe(5)
    })

    test('should calculate commission correctly for CASH_OUT operation', () => {
        const mockOperations: Operation[] = [
            { date: "2016-01-06", user_id: 1, user_type: UserType.NATURAL, type: OperationType.CASH_OUT, operation: { amount: 1000.00, currency: CURRENCY.EUR } },
            { date: "2016-01-07", user_id: 1, user_type: UserType.NATURAL, type: OperationType.CASH_OUT, operation: { amount: 100.00, currency: CURRENCY.EUR } },
            { date: "2016-01-10", user_id: 1, user_type: UserType.NATURAL, type: OperationType.CASH_OUT, operation: { amount: 100.00, currency: CURRENCY.EUR } },
        ]
        expect(calculateCommission(mockOperations[0], mockOperations)).toBe(0)
        expect(calculateCommission(mockOperations[1], mockOperations)).toBe(0.3)
    });
});