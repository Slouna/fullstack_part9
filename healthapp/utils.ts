export type Rating = 1 | 2 | 3;

export const getRating = (targetHours: number, actualHours: number): Rating => {
    
    let rating: Rating; 
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
    
    
    
};



export const getRatingDescription = (rating: Rating) => {
    switch(rating) {
        case(3):
            return "Great job! Keep up the good work!";
        case(2): 
            return "Not too bad but could be better";
        case (1):
            return "This isn't ideal, you can only improve from here";
    }
};

export const countAverage = (dailyHours: number[]) => {
    if(dailyHours.length === 0){
        return 0;
    }
    const combined = dailyHours.reduce(((sum, days) =>sum + days), 0);
    
    const avg = combined / dailyHours.length;
    return avg;
};

export const countTrainingDays = (dailyHours: number[]) => {
    
    const trainingDays = dailyHours.reduce(
        ((count, d) => d > 0 ? count + 1 : count), 0);
    
    return trainingDays;
};
