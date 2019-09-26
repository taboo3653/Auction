import express from "express";

const app = express();
const API_PORT = 3001;

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
