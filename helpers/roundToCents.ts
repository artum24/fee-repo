export const roundToCents = (amount: number): number => {
    return Math.ceil(amount * 100) / 100;
}