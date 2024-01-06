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

const calculateExercises = (inputs: number[], target: number): ExerciseResult => {
    const periodLength = inputs.length;
    const trainingDays = inputs.filter(num => num !== 0).length
    const average = inputs.reduce((acc:number, currentValue: number) => acc + currentValue) / 7
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));