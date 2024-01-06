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
        console.log('Overweight II (Moderately obese weight');        
    }else if (bmi >= 30){
        console.log('Overweight III (Severly obese weight)');        
    }
}

calculateBmi(180, 74);