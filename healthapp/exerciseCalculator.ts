import { type Rating, countAverage, countTrainingDays, getRating, getRatingDescription } from "./utils.ts";

const calculateExercises = (dailyHours: number[], targetAmount: number): Result => {
    
    return {
        periodLength: dailyHours.length,
        trainingDays: countTrainingDays(dailyHours),
        success: countAverage(dailyHours) >= targetAmount,
        rating: getRating(targetAmount, countAverage(dailyHours)),
        ratingDescription: getRatingDescription(getRating(targetAmount, countAverage(dailyHours))),
        target: targetAmount,
        average: countAverage(dailyHours)
    };  
};
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: Rating;
    ratingDescription: string;
    target: number;
    average: number;
}

interface InputValues {
    target: number;
    days: number[];
}

const parseArgs = (args: string[]): InputValues =>{
    if(args.length < 4) throw new Error('Not enough arguments');
    
    for (let i = 2; i < args.length; i++){
        if(isNaN(Number(args[i]))){
            throw new Error('Values given were not numbers');
        }
    }
    const targetGiven: number = Number(args[2]);
    

    let daysGiven: number[] = [];
    for(let i = 3; i < args.length; i++){
        daysGiven = daysGiven.concat(Number(args[i]));
        
    }
    return {
        target: targetGiven,
        days: daysGiven
    };
};
if (process.argv[1] === import.meta.filename) {
    try {
        const {target, days} = parseArgs(process.argv);
        console.log(calculateExercises(days, target));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
        errorMessage += error.message;  
        }
        console.log(errorMessage);
    }
}

export default calculateExercises;
