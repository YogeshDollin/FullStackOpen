export type Operation = 'multiply' | 'add' | 'subtract' | 'divide';

export const calculator = (a: number, b: number, op: Operation) => {
    switch (op) {
        case 'multiply':
            return a * b;
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'divide':
            if (b === 0) throw new Error('Can\'t divide by zero');
            return a / b;
        default:
            throw new Error('Operation is not multiply, add, subtrat or divide');
    }
};

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);

console.log(calculator(a, b, 'add'));