import express from 'express';
import dotenv from 'dotenv';
import studentsRouter from './routes/studentsRouter.ts';
import { PrismaClient } from '@prisma/client';
import { checkDataField } from './middleware/errorHandling.ts';
dotenv.config();

export const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(checkDataField);

app.use('/api/students', studentsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`express server running on port ${PORT}`));
