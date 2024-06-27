import express from "express";
import multiplicator from "./multiplicator";
import divider from "./divider";

const app = express();
app.use(express.json());

app.post("calculate", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;

    if ( !value1 || isNaN(Number(value1)) )
    {
        return res.status(400).send({ error: "..." })
    }
    
    if (op === "*")
    {
        const result = multiplicator(Number(value1), Number(value2), "multi");
        res.send({ result });
    }
    else if (op === "/")
    {
        const result = divider(Number(value1), Number(value2), "divide");
        res.send({ result });
    }
    
});

app.get("/ping", (_req, res) => {
    res.send("pong");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});