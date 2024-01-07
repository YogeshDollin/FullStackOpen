// interface HeightWeight {
//     height: number;
//     weight: number;
// }
// const parseArguments = (args: string[]): HeightWeight => {
//     if(args.length < 4) throw new Error('Not enough arguments')
//     if(args.length > 4) throw new Error('too many arguments')

//     if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
//         return {
//             height: Number(args[2]),
//             weight: Number(args[3])
//         }
//     }
//     throw new Error('Provided values are not number')
// }

const calculateBmi = (height: number, weight: number): {weight: number, height: number, bmi: string} => {
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters * heightInMeters)
    const result = {height, weight, bmi: ''}

    if(bmi < 18.5){
        result.bmi = 'Underweight (Unhealthy weight)';
    }else if(bmi >= 18.5 && bmi < 23){
        result.bmi = 'Normal (healthy weight)'
    }else if(bmi >= 23 && bmi < 25 ){
        result.bmi = 'Overweight I (At risk weight)'
    }else if(bmi >= 25 && bmi < 30){
        result.bmi = 'Overweight II (Moderately obese weight)'
    }else if (bmi >= 30){
        result.bmi = 'Overweight III (Severly obese weight)'
    }
    return result
}
// const {height, weight} = parseArguments(process.argv)
// calculateBmi(height, weight);

export default calculateBmi