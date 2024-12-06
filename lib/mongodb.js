// lib/mongodb.js

import mongoose from 'mongoose';
const MONGO_URI = process.env.DATABASE_URL;


export async function connect() {
    
    if (!MONGO_URI) {
        throw new Error('DATABASE_URL is not defined in environment variables');
    }

    try {
        // Await the connection
        await mongoose.connect(MONGO_URI);

        const connection = mongoose.connection;

        // Ensure listeners are attached only once
        if (connection.listeners('connected').length === 0) {
            connection.on('connected', () => {
               
            });
        }

        if (connection.listeners('error').length === 0) {
            connection.on('error', (err) => {
                console.error('MongoDB connection error:', err);
            });
        }
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error; // Optionally rethrow the error for higher-level handling
    }
}


// import mongoose from 'mongoose';
// const MONGO_URI = process.env.DATABASE_URL;

// export async function connect() {
//     try {
//         await mongoose.connect(MONGO_URI);
//         const connection = mongoose.connection;

//         connection.on('connected', () => {
//             console.log('MongoDB connected successfully');
//         })

//         connection.on('error', (err) => {
//             console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
//             process.exit();
//         })

//     } catch (error) {
//         console.log('Something goes wrong!');
//         console.log(error);

//     }


// }
            
            
            // import mongoose from 'mongoose';
            // const MONGODB_URI = process.env.NEXT_DATABASE_URL;
            // let cached = global._mongoCache || { conn: null, promise: null };
            // global._mongoCache = cached;
            
            // async function connectToDatabase() {
                //     if (cached.conn) return cached.conn;
                
                //     if (!cached.promise) {
                    //         cached.promise = mongoose.connect(MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }).then((mongoose) => mongoose);
//     }
//     cached.conn = await cached.promise;
//     console.log("database connected")
//     return cached.conn;
// }
// export default connectToDatabase;



// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.NEXT_DATABASE_URL;

// if (!MONGODB_URI) {
    //     throw new Error('Please define the MONGODB_URI environment variable');
    // }
    
    // let cached = global.mongoose;

    // if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectToDatabase() {
    //     if (cached.conn) {
        //         return cached.conn;
        //     }
        
        //     if (!cached.promise) {
            //         cached.promise = mongoose.connect(MONGODB_URI, {
                //             useNewUrlParser: true,
                //             useUnifiedTopology: true,
                //         }).then((mongoose) => mongoose);
                //     }
                //     cached.conn = await cached.promise;
                //     return cached.conn;
                // }
                
                // export default connectToDatabase;
                
                
                // import { MongoClient } from "mongodb";
                
                
                // const options = {
                //     useNewUrlParser: true,
                //     useUnifiedTopology: true,
                // };
                
                // let client;
                // let clientPromise;
                
                // if (!process.env.DATABASE_URL) {
                //     throw new Error("Please add your MongoDB URI to .env.local");
                // }
                
                // if (process.env.NODE_ENV === "development") {
                //     if (!global._mongoClientPromise) {
                //         client = new MongoClient(process.env.DATABASE_URL, options);
                //         global._mongoClientPromise = client.connect();
                //     }
                //     clientPromise = global._mongoClientPromise;
                // } else {
                //     client = new MongoClient(process.env.DATABASE_URL, options);
                //     clientPromise = client.connect();
                // }
                
                // export default clientPromise;