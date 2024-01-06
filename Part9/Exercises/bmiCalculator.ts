interface HeightWeight {
    height: number;
    weight: number;
}
const parseArguments = (args: string[]): HeightWeight => {
    if(args.length < 4) throw new Error('Not enough arguments')
    if(args.length > 4) throw new Error('too many arguments')

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    }
    throw new Error('Provided values are not number')
}

const calculateBmi = (height: number, weight: number) => {
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters * heightInMeters)

    if(bmi < 18.5){
        console.log('Underweight (Unhealthy weight)');        
    }else if(bmi >= 18.5 && bmi < 23){
        console.log('Normal (healthy weight)');        
    }else if(bmi >= 23 && bmi < 25 ){
        console.log('Overweight I (At risk weight)');        
    }else if(bmi >= 25 && bmi < 30){
        console.log('Overweight II (Moderately obese weight)');        
    }else if (bmi >= 30){
        console.log('Overweight III (Severly obese weight)');        
    }
}
const {height, weight} = parseArguments(process.argv)
calculateBmi(height, weight);

export default 'this is masking warning'