export const CASH_IN = {
    percents: 0.03,
    max_fee: {
        amount: 5,
        currency: 'EUR'
    },
};

export const CASH_OUT = {
    natural: {
        percents: 0.3,
        week_limit: {
            amount: 1000,
            currency: 'EUR'
        },
    },
    juridical: {
        percents: 0.3,
        min_fee: {
            amount: 0.5,
            currency: 'EUR',
        },
    },
};