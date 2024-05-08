import { CURRENCY } from "../constants/currency";
import { OperationType } from "../constants/operation";
import { UserType } from "../constants/userType";

export interface Operation {
    date: string;
    user_id: number;
    user_type: UserType;
    type: OperationType;
    operation: {
        amount: number;
        currency: CURRENCY;
    };
}