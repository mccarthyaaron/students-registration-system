import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import 'colors';
import { StudentModel } from '../models/student-model/studentSchema.ts';
import { EnrollmentModel } from '../models/enrollment-model/enrollmentSchema.ts';
import {
  PaymentMethodModel,
  StudentBillingItemModel,
  StudentBillingModel,
  StudentPaymentModel,
} from '../models/studentTransactionModel/studentTransactionSchema.ts';

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
  if (process.env.NODE_ENV === 'development') {
    await StudentModel.init();
    await EnrollmentModel.init();
    await StudentBillingModel.init();
    await StudentBillingItemModel.init();
    await StudentPaymentModel.init();
    await PaymentMethodModel.init();
  }
}
