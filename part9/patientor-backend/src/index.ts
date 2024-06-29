import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();

app.use("/", cors());
app.use("/", express.json());

app.get("/api/ping", (_req, res) => {
    console.log("Someone pinged here");
    res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));