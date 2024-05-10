import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import studentsRouter from './routes/studentsRouter.ts';
// import { PrismaClient } from '@prisma/client';
import { checkDataField, genericErrorMiddleware } from './middleware/errorHandling.ts';
import { connectToLocalDB } from './utilities/utilities.ts';
import { createParent, createStudent } from './models/student-model/studentModel.ts';
import mongoose from 'mongoose';

connectToLocalDB();
createParent({
  name: 'Kato Vicent',
  // gender: 'MALE',
  gender: 'MALE',
  email: 'kato@gmail.com',
  primaryContact: '0756-734466',
  contact2: '0756-734465',
  physicalAddress1: 'Entebbe, Virus',
});

createStudent({
  name: {
    surname: 'Mutebi',
    firstName: 'Aaron',
    lastName: 'McCarthy',
  },
  dateOfBirth: new Date('1998/10/13'),
  gender: 'MALE',
  grade: 'KG1',
  residentialStatus: 'BOARDING',
  parents: [
    {
      name: 'Kato Vicent',
      gender: 'MALE',
      primaryContact: '0756-734466',
      contact2: '0756-734465',
      email: 'kato@gmail.com',
      physicalAddress1: 'Entebbe, Virus',
      _id: new mongoose.Types.ObjectId('663e2e18400e111cd998b609'),
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
