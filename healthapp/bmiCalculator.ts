const calculateBmi = (heightInCm: number, weightInKg: number) => {
    
    
    if(heightInCm <= 0 || weightInKg <= 0){
        throw new Error("check the given values");
    }
    const heightInMeters = heightInCm /100;

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    if (bmi < 18.5) {
        return "underweight";
    } else if (bmi < 24.9){
        return "normal range";
    } else if (bmi < 29.9) {
        return "overweight";
    } else if (bmi > 30) {
        return "obese";
    } else{
        throw new Error("malformatted parameters");
    }
};

interface bmiInputValues {
    height: number;
    weight: number;
}

const bmiParseArgs = (args: string[]): bmiInputValues =>{
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');
    
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height: Number(args[2]),
            weight: Number(args[3])
    };
    } else {
        throw new Error('Values given were not numbers');
    }
};
if (process.argv[1] === import.meta.filename) {
    try {
        const {height, weight} = bmiParseArgs(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
        errorMessage += error.message;  
        }
        console.log(errorMessage);
    }
}
export default calculateBmi;
