import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import studentsRouter from './routes/studentsRouter.ts';
import { checkDataField, genericErrorMiddleware } from './middleware/errorHandling.ts';
import { connectToLocalDB } from './utilities/utilities.ts';
import { createStudent } from './models/student-model/studentModel.ts';

connectToLocalDB();

createStudent({
  name: {
    surname: 'Juuko',
    firstName: 'Carlton',
    // lastName: 'Hannah',
  },
  dateOfBirth: new Date('2017/7/13'),
  gender: 'MALE',
  grade: 'KG3',
  residentialStatus: 'DAY',
  parents: [
    {
      name: 'Mutebi Daianah',
      relationship: 'Mother',
      gender: 'FEMALE',
      primaryContact: '0756-735566',
      contact2: '0756-734545',
      email: 'diana@gmail.com',
      physicalAddress1: 'Entebbe, Virus',
    },
  ],
});
const app = express();

app.use(express.json());
app.use(checkDataField);

app.use('/api/students', studentsRouter);

// Error-handling middleware
app.use(genericErrorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`express server running on port ${PORT}`.green.underline));
