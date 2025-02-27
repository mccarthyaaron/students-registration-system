import express from 'express';
import 'colors';
import dotenv from 'dotenv';
dotenv.config();
import studentsRouter from './routes/student-routes/studentsRouter';
import { checkDataField, genericErrorMiddleware } from './middleware/errorHandling';
import { connectToAtlasLearningDB, connectToLocalDB } from './config/config';
import { type NodeError } from './utilities/types';

// const client = await connectToLocalDB();
// const client = await connectToAtlasLearningDB();

const app = express();

app.use(express.json());
app.use(checkDataField);

app.use('/api/students', studentsRouter);

// Error-handling middleware
app.use(genericErrorMiddleware);

const PORT = process.env.PORT || 5000;
app
  .listen(PORT, () => console.log(`express server running on port ${PORT}`.green.underline))
  .on('error', (error: NodeError) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please try a different port.`.red);
    } else {
      console.error(`Failed to start server: ${error.message}`.red);
    }
    process.exit(1);
  });
