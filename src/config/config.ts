import dotenv from 'dotenv';
dotenv.config();
import 'colors';
import { MongoClient } from 'mongodb';

const localDbUri = process.env.MONGODB_LOCAL_URI;
const atlasLearningDbUri = process.env.MONGODB_ATLAS_LEARNING_URI;

export async function connectToLocalDB() {
  if (!localDbUri) {
    throw Error('The URI for the database is not provided');
  }

  const client = new MongoClient(localDbUri);

  try {
    await client.connect();
    await client.db().command({ ping: 1 });
    console.log('Successfuly connected to database'.blue.underline);
  } catch (error) {
    throw Error(`Failed to connect to Database: ${error}`.red.underline);
  }

  return client;
}

export async function connectToAtlasLearningDB() {
  if (!atlasLearningDbUri) {
    throw Error('The URI for the database is not provided');
  }

  const client = new MongoClient(atlasLearningDbUri);

  try {
    await client.connect();
    await client.db().command({ ping: 1 });
    console.log('Successfuly connected to Atlas database'.blue.underline);
  } catch (error) {
    throw Error(`Failed to connect to Database: ${error}`.red.underline);
  }
  return client;
}
