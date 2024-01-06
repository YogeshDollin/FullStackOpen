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

const parseArguments = (args: string[]): ParseReturnType => {
    if(args.length < 4) throw new Error('Not enough arguments');
    const [, , target, ...rest] = args
    try {
        return {
            target: Number(target),
            exercises: rest.map(num => Number(num))
        }
    } catch (error) {
        let errorMessage = 'Something went wrong';
        if(error instanceof Error){
            errorMessage += 'Error: ' + error.message
        }
        console.log(errorMessage);        
    }
}

const calculateExercises = (inputs: number[], target: number): ExerciseResult => {
    const periodLength = inputs.length;
    const trainingDays = inputs.filter(num => num !== 0).length
    const average = inputs.reduce((acc:number, currentValue: number) => acc + currentValue) / periodLength
    const success = average === target
    const rating = 2
    const ratingDescription = 'not too bad but could be better'

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const {target, exercises} = parseArguments(process.argv)

console.log(calculateExercises(exercises, target));