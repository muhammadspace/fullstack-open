import express from "express";
import bmi from "./bmiCalculator";
import calculateExercises, { Result } from "./exerciseCalculator";

interface BmiResponse {
    height: number,
    weight: number,
    bmi: string
}

const app = express();

app.use('/', express.json())

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;

    if (!isNaN(Number(height)) && !isNaN(Number(weight)))
    {
        const result: BmiResponse = {
            height: Number(height),
            weight: Number(weight),
            bmi: bmi(Number(height), Number(weight))
        };

        res.json(result);
    }
    else
        res.json({ error: "malformatted parameters" });
    
});

app.post("/exercises", (req, res) => {
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target)
        res.status(400).json({ error: "Parameters missing" });
    if (isNaN(Number(target)))
        res.status(400).json({ error: "Malformatted parameters" });
    (daily_exercises as number[]).forEach(val => {
        if (isNaN(Number(val)))
            res.status(400).json({ error: "Malformatted parameters" });
    })

    try
    {
        const result: Result = calculateExercises({ hoursArr: daily_exercises as number[], target: Number(target) })
        res.status(200).json(result)
    }
    catch (error: unknown)
    {
        if (error instanceof Error)
            res.status(400).json({ error: "Error: " + error.message })
    }

})

const PORT = 3003;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));