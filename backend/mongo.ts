import { Bson, MongoClient } from '$mongo/mod.ts';
import {
  MONGO_DATABASE,
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_PORT,
  MONGO_TLS,
} from '../env.ts';

export const NotConnectedError = new Error('Not connected to MongoDB');

const client = new MongoClient();

let connected = false;

// Get the database
export function getDatabase() {
  if (!connected) {
    throw NotConnectedError;
  }

  return client.database(MONGO_DATABASE );
}

while (!connected) {
  try {
    // await client.connect(     {
    //     db: MONGO_DATABASE,
    //     tls: MONGO_TLS === 'true',
    //     servers: [
    //       {
    //         host: MONGO_URL,
    //         port: parseInt(MONGO_PORT),
    //       },
    //     ],
    //     credential: {
    //       mechanism: 'SCRAM-SHA-1',
    //       password: MONGO_PASSWORD,
    //       username: MONGO_PASSWORD,
    //       db: 'admin'
    //     },
    //   });

    await client.connect(MONGO_URL);
    connected = true;
  } catch (e) {
    console.log('Error connecting to MongoDB', e);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
