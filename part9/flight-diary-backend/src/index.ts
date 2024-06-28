import express from "express";
import cors from "cors";
import diariesRouter from "./routes/diaries";

const app = express();

app.use('/', cors());
app.use('/', express.json());

app.get("/ping", (_req, res) => {
    console.log("Someone pinged here");
    res.send("pong");
});

app.use("/api/diaries", diariesRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));