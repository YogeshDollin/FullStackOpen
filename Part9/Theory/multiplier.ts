interface MultiplyValues {
    value1: number;
    value2: number;
}

const parseArguments = (argv: string[]): MultiplyValues => {
    if(argv.length > 4) throw new Error('Too many arguments');
    if(argv.length < 4) throw new Error('Not enough arguments');

    if(!isNaN(Number(argv[2])) && !isNaN(Number(argv[3]))){
        return {
            value1: Number(argv[2]),
            value2: Number(argv[3])
        };
    }else{
        throw new Error('Provided values were not number');
    }
};

const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText, a * b);
};

try {
    const {value1, value2} = parseArguments(process.argv);
    multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, result is: `);
} catch (error) {
    let errorMessage = 'Something went wrong';
    if(error instanceof Error){
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);   
}