import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import loadRoutes from "./loaders/routes.js";
import "dotenv/config";

const app = express();
const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
loadRoutes(app);

export default app;
