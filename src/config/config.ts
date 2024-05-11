import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import 'colors';
import { StudentModel } from '../models/student-model/studentSchema.ts';

const localDbUri = process.env.MONGODB_LOCAL_URI;

// disable creating indexes in production
const isAutoIndex = process.env.NODE_ENV === 'production' ? false : true;

export async function connectToLocalDB() {
  if (!localDbUri) {
    throw Error('The URI for the database is not provided');
  }

  try {
    await mongoose.connect(localDbUri, { autoIndex: isAutoIndex });
    console.log('Connected to database successfully'.blue.underline);
  } catch (error) {
    throw Error(`Failed to connect to Database: ${error}`.red.underline);
  }
  mongoose.connection.on('disconnected', (err) => {
    throw Error(`Database disconneced: ${err}`);
  });
  mongoose.connection.on('error', (err) => {
    throw Error(err);
  });
}

export async function initialiseLocalDb() {
  await connectToLocalDB();
  process.env.NODE_ENV === 'development' && (await StudentModel.init());
}
