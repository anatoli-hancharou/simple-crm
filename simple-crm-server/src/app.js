import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import loadRoutes from './loaders/routes.js'


const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
loadRoutes(app);

export default app;