type RatingRange = 1 | 2 | 3;

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: RatingRange;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ParseReturnType {
    target: number;
    exercises: number[]
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exerciseCalculatorParseArguments = (daily_exercises: any, target: any ): ParseReturnType => {
    try {
        return {
            target: Number(target),
            exercises: daily_exercises.map((num: any) => Number(num))
        };
    } catch (error) {
        let errorMessage = 'Something went wrong';
        if(error instanceof Error){
            errorMessage += 'Error: ' + error.message;
        }
        console.log(errorMessage);       
        throw error; 
    }
};

export const calculateExercises = (inputs: number[], target: number): ExerciseResult => {
    const periodLength = inputs.length;
    const trainingDays = inputs.filter(num => num !== 0).length;
    const average = inputs.reduce((acc:number, currentValue: number) => acc + currentValue) / periodLength;
    const success = average === target;
    const rating = 2;
    const ratingDescription = 'not too bad but could be better';

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// const {target, exercises} = parseArguments(process.argv);

// console.log(calculateExercises(exercises, target));