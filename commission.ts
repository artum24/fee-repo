import * as fs from 'fs';
import { Operation } from './types/operation';
import { roundToCents } from './helpers/roundToCents';
import { calculateCommission } from './helpers/calculateCommission';

export const processOperations = (operations: Operation[]) => {
    for (const operation of operations) {
        const commission = calculateCommission(operation, operations);
        console.log(roundToCents(commission));
    }
}

export const main = async (inputFilePath: string) => {
    const input = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8')) as Operation[];
    processOperations(input);
}

main(process.argv[2]);
