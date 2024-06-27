const calculateBmi = (height: number, weight: number): string => {
    if (height <= 0)
        throw new Error(`Please enter a valid height (received height ${height})`);

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    if (bmi < 16)
        return "Underweight (severe thinness)";
    else if (bmi >= 16 && bmi < 16.9)
        return "Underweight (moderate thinness)";
    else if (bmi >= 16.9 && bmi < 18.4)
        return "Underweight (mild thinness)";
    else if (bmi >= 18.4 && bmi < 24.9)
        return "Normal weight";
    else if (bmi >= 24.9 && bmi < 29.9)
        return "Overweight (pre-obese)";
    else if (bmi >= 29.9 && bmi < 34.9)
        return "Obese (Class I)";
    else if (bmi >= 34.9 && bmi < 39.9)
        return "Obese (Class II)";
    else if (bmi >= 39.9)
        return "Obese (Class III)";

    return "Something went wrong. Please try again.";
};

// console.log(calculateBmi((Number(process.argv[2])), Number(process.argv[3])));

export default calculateBmi;