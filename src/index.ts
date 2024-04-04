import express from 'express';
import dotenv from 'dotenv';
import studentsRouter from './students/studentsRouter';
dotenv.config();

const app = express();

// All requests to api/students
app.use('/api/students', studentsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`express server running on port ${PORT}`));
