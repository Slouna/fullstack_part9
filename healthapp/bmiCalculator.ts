const calculateBmi = (heightInCm: number, weightInKg: number) => {
    const heightInMeters = heightInCm /100;
    
    if(heightInCm <= 0 || weightInKg <= 0){
        return "check the given values";
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);

    if (bmi < 18.5) {
        return "underweight";
    } else if (bmi < 24.9){
        return "normal range";
    } else if (bmi < 29.9) {
        return "overweight";
    } else if (bmi > 30) {
        return "obese"
    } else{
        return "something went wrong, check the given values"
    }
}
console.log(calculateBmi(180, 74));
console.log(calculateBmi(180, 94));
console.log(calculateBmi(180, 54));
console.log(calculateBmi(0, 74));