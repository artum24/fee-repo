import { roundToCents } from '../helpers/roundToCents';

describe('roundToCents function', () => {
    test('should round amount to two decimal places', () => {
        expect(roundToCents(7.85000)).toBe(7.85);
    });
});