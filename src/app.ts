import express, { Application } from 'express';
import errorHandler from './middleware/errorHandler';
import router from './routes';
import connectDB from './database';
import helmet from 'helmet';
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(helmet());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/image", express.static("public/image"));

app.use('/api', router);
app.use(errorHandler);

export default app;
