import express from 'express';
import 'colors';
import dotenv from 'dotenv';
dotenv.config();
import studentsRouter from './routes/student-routes/studentsRouter.ts';
import { checkDataField, genericErrorMiddleware } from './middleware/errorHandling.ts';
import { connectToLocalDB } from './config/config.ts';

const client = await connectToLocalDB();
const app = express();

app.use(express.json());
app.use(checkDataField);

app.use('/api/students', studentsRouter);

// Error-handling middleware
app.use(genericErrorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`express server running on port ${PORT}`.green.underline));
