type Rating = (1 | 2 | 3);
type RatingDescription = (
    "Poor performance; definitely could do better" |
    "Okay..." | 
    "Doing good!"
);
interface Params {
    hoursArr: number[],
    target: number;
}

export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating,
    ratingDescription: RatingDescription,
    target: number,
    average: number
}

// const parseArguments = (args: string[]): Params => {
//     const mapped: number[] = args.map((arg: string): number => Number(arg));
//     const hoursArr: number[] = mapped.slice(3, mapped.length);
//     const target: number = Number(mapped.at(2));

//     hoursArr.forEach(val => {
//         console.log(val);
//         if (isNaN(val))
//             throw new Error("Please enter a valid number.");
//         if (val < 0)
//             throw new Error("Please enter positive numbers only.");
//     });
//     if (isNaN(target))
//         throw new Error("Please enter the target as a number.");
//     if (target < 0) 
//         throw new Error("Please enter a positive number as a target.");

//     return { hoursArr, target };
// };

const calculateExercises = ({ hoursArr, target }: Params): Result => {
    const periodLength: number = hoursArr.length;
    const trainingDays: number = hoursArr.reduce((sum: number, cur: number): number => cur > 0 ? ++sum : sum, 0);
    const average: number = hoursArr.reduce((sum: number, cur: number): number => sum += cur, 0) / periodLength;
    const success: boolean = average >= target;
    const rating: number = (Math.floor(trainingDays / periodLength) % 3) + 1;
    const ratingDescription: RatingDescription = 
        rating === 1 ? "Poor performance; definitely could do better"
        : rating === 2 ? "Okay..."
        : "Doing good!";

    return {
        periodLength,
        trainingDays,
        success,
        rating: rating as Rating,
        ratingDescription,
        target,
        average,
    };
};

// console.log(calculateExercises(parseArguments(process.argv)));

export default calculateExercises