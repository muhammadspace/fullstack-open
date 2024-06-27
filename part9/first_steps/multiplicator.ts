interface MultiplyValues {
    value1: number,
    value2: number,
}

const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length > 4) throw new Error("Too many arguments.");
    if (args.length < 4) throw new Error("Too few arguments.");

    const value1 = Number(args[2]);
    const value2 = Number(args[3]);

    if (isNaN(value1) || isNaN(value2))
        throw new Error("Values provided were not numbers");

    return {
        value1, value2
    };
};

const multiplicator = (value1: number, value2: number, message: string): void => {
    console.log(message, value1 * value2);
};

try
{
    const { value1: a, value2: b } = parseArguments(process.argv);
    multiplicator(a, b, `Multiplied ${a} by ${b} and the result is: `);
}
catch (error: unknown)
{
    if (error instanceof Error)
        console.log("Something went wrong: " + error.message);
}

export default multiplicator;