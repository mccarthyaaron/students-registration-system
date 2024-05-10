import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import 'colors';

const localDbUri = process.env.MONGODB_LOCAL_URI;

export async function connectToLocalDB() {
  if (!localDbUri) {
    throw Error('The URI for the database is not provided');
  }

  try {
    await mongoose.connect(localDbUri);
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

export function validateEmail(email: string): boolean {
  return false;
}

export const createFetchResponseBody = (data: any) => {
  return {
    data,
  };
};
