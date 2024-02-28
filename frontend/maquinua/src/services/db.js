const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection string
const connectionString = 'your_mongodb_connection_string';
const COLLECTION = "maquinua_main";

// Function to connect to MongoDB
async function connectToDatabase() {
  const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(); // Return the database object
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}


export async function createUser(user) {
  const db = await connectToDatabase();
  const usersCollection = db.collection(COLLECTION);
  const result = await usersCollection.insertOne(user);
   
  if (result.insertedCount !== 1) {
    throw new Error("User not created!")
  }
}


export async function updateUser(userId, updatedUserData) {
  const db = await connectToDatabase();
  const usersCollection = db.collection(COLLECTION);
  const result = await usersCollection.updateOne({ _id: ObjectId(userId) }, { $set: updatedUserData });
  
}


export async function deleteUser(userId) {
  const db = await connectToDatabase();
  const usersCollection = db.collection(COLLECTION);
  const result = await usersCollection.deleteOne({ _id: ObjectId(userId) });
  console.log('User deleted:', result.deletedCount, 'document(s) deleted');
}


export async function readUser(userId) {
  const db = await connectToDatabase();
  const usersCollection = db.collection(COLLECTION);
  const user = await usersCollection.findOne({ _id: ObjectId(userId) });
  
  return user;
}
