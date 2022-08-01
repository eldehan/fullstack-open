interface BmiValues {
  heightInCm:number;
  weightInKg:number;
}

export const parseBmiArguments = (
  height:number,
  weight:number
): BmiValues => {
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      heightInCm: height,
      weightInKg: weight
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (
  heightInCm:number, 
  weightInKg:number
):string => {
  const heightInM:number = heightInCm / 100;
  const bmi:number = weightInKg / Math.pow(heightInM, 2);

  if (bmi < 18.5) return 'Underweight (Unhealthy weight)';
  else if (bmi <= 24.9) return 'Normal (Healthy weight)';
  else if (bmi <= 29.9) return 'Overweight (Unhealthy weight)';
  else if (bmi <= 34.9) return 'Obese (Unhealthy weight)';
  else return 'Extremely Obese (Unhealthy weight)';
};