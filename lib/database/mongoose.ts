import mongoose, { Mongoose } from 'mongoose';

const MONGOBD_URL = process.env.MONGDB_URL

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;

    if(!MONGOBD_URL) throw new Error('Missing MONGODB_URL is not defined');

    cached.promise = 
        cached.promise || 
        mongoose.connect(MONGOBD_URL, {
        dbName: 'IMAGINIFY',
        bufferCommands: false
    })

    cached.conn = await cached.promise;

    return cached.conn;
}