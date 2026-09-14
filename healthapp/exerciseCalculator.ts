
const calculateExercises = (dailyHours: number[], targetAmount: number): Result => {
    
    return {
        periodLength: dailyHours.length,
        trainingDays: countTrainingDays(dailyHours),
        success: countAverage(dailyHours) >= targetAmount,
        rating: getRating(targetAmount, countAverage(dailyHours)),
        ratingDescription: getRatingDescription(getRating(targetAmount, countAverage(dailyHours))),
        target: targetAmount,
        average: countAverage(dailyHours)
    }

    
    


    
}

const getRating = (targetHours: number, actualHours: number) => {
    
    let rating: Rating 
    // if actual hours are more than 90 % of the target, rating is 3
    if (actualHours >= targetHours*0.9) {
        rating = 3;
    }
    //if actual hours are more than 2/3 of the target hours, rating is 2
    else if (actualHours >= targetHours*0.66){
        rating = 2;
    }
    else {
        rating = 1;
    }
    return rating;
    
    
    
}

type Rating = 1 | 2 | 3;

const getRatingDescription = (rating: Rating) => {
    switch(rating) {
        case(3):
            return "Great job! Keep up the good work!";
        case(2): 
            return "Not too bad but could be better";
        case (1):
            return "This isn't ideal, you can only improve from here";
    }
}

const countAverage = (dailyHours: number[]) => {
    let avg = 0;
    for (let i = 0; i < dailyHours.length; i++){
        avg += dailyHours[i]
    }
    avg = avg / dailyHours.length
    return avg;
}

const countTrainingDays = (dailyHours: number[]) => {
    let trainingDays = 0;
    for(let i = 0; i < dailyHours.length; i++){
        if (dailyHours[i] > 0){
            trainingDays++;
        }
    }
    return trainingDays;
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: Rating;
    ratingDescription: String;
    target: number;
    average: number;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));