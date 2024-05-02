import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { Incident } from '../model/Incidents.js';


import { User} from "../model/User.js";


// TODO: Estudiar si falta cerrar las conexiones a la base de datos

const USER = "ruser1";
const PASSWORD = "rpassw1";
const HOST = "0.0.0.0";
const PORT = "27017";
const DATABASE = "maquinua";
const COLLECTION_MAIN = "maquinua_main";
const COLLECTION_ANALYTICS = "maquinua_analytics";

// mongodb://<container-name>:27017/<database-name>
const connectionString = `mongodb://mongodb:27017/${DATABASE}`;


/**
 * Connects to the database and returns a reference to the database
 * @returns {Promise<Db>}
 */
async function connectToDatabase() {
  const client = new MongoClient(connectionString, {
    serverApi: ServerApiVersion.v1
  });

  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}


/**
 * Creates a user in the database
 * @param {User} user
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function createUser(user) {
  let db = null;
  try {
    if (user === undefined) {
      throw new Error("User not created!");
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection(COLLECTION_MAIN);
    const result = await usersCollection.insertOne(user.toJSON());

    //if (result.insertedCount !== 1) {
    //  throw new Error("User not created! Rows affected: ", result.insertedCount)
    //}
  } catch (error) {
    console.error(error);
    throw new Error("User not created!");
  } finally {
    //if (db != null) {
    //  await db.close();
    //  console.log('Disconnected from MongoDB');
    //}
  }
}


/**
 * Updates a user in the database
 * @param {string} email
 * @param {User} updatedUserData
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function updateUser(email, updatedUserData) {
  let db = null;
  try {
    if (email === undefined || updatedUserData === undefined) {
      throw new Error("User not updated! email or updatedUserData is undefined!");
    }

    db = await connectToDatabase();
    const usersCollection = db.collection(COLLECTION_MAIN);
    const result = await usersCollection.updateOne({
      email: email,
    }, { $set: updatedUserData.toJSON() });

    //if (result.modifiedCount !== 1) {
    //  throw new Error("User not updated!")
    //}
  } catch (error) {
    console.error(error);
    throw new Error("User not updated!");
  } finally {
    //if (db != null) {
    //  await db.close();
    //}
  }
}


/**
 * Deletes a user from the database
 * @param {string} email
 * @returns {Promise<void>}
 * @throws {Error} If the user is not deleted: not found in DB or error deleting
 */
export async function deleteUser(email) {
  let db = null;
  try {
    if (email === undefined) {
      throw new Error("User not deleted!");
    }

    db = await connectToDatabase();
    const usersCollection = db.collection(COLLECTION_MAIN);
    const result = await usersCollection.deleteOne({
      email: email,
    });

    if (result.deletedCount !== 1) {
      throw new Error("User not deleted!")
    }
  }
  catch (error) {
    console.error(error);
    throw new Error("User not deleted!");
  } finally {
    //if (db != null) {
    //  await db.close();
    //  console.log('Disconnected from MongoDB');
    //}
  }
}


/**
 * Reads a user from the database
 * @param {string} email
 * @returns {Promise<User>}
 */
export async function readUser(email) {
  let db = null;
  try {
    if (email === undefined) {
      throw new Error("User not read!");
    }
    
    db = await connectToDatabase();
    const usersCollection = db.collection(COLLECTION_MAIN);
    const userObj = await usersCollection.findOne({
      email: email,
    });
   

    if (userObj === null) {
      throw new Error("User not read! User not found in DB");
    }


    const user = new User();
    user.name = userObj.name;
    user.username = userObj.username;
    user.surname = userObj.surname;
    user.email = userObj.email;
    user.password = userObj.password;
    user.bornDate = userObj.bornDate;
    user.type = userObj.type;

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("User not read!");
  } finally {
    //if (db != null) {
    //  await db.close();
    //}
  }
}


/**
 * Reads all users from the database
 * @returns {Promise<[User]>}
 * @throws {Error} If the users are not read
 */
export async function readAllUsers() {
  let db = null;
  try {
    db = await connectToDatabase();
    const usersCollection = db.collection(COLLECTION_MAIN);
    const usersObj = await usersCollection.find({
      
    }).toArray();
    const typeUsers = usersObj.map((u) => {
        const iterUser = new User();

        iterUser.username = u.username;
        iterUser.name = u.name;
        iterUser.surname = u.surname;
        iterUser.email = u.email;
        iterUser.password = u.password;
        iterUser.bornDate = new Date(u.bornDate);
        iterUser.type = u.type;

        return iterUser;
    });

    return typeUsers;
  } catch (error) {
    console.error(1 + error);
    throw new Error("Users not read!")
  } finally {
    //if (db != null()) {
     //await db.close();
     //console.log('Disconnected from MongoDB');
    //}
  }
}


/**
 * Deletes all users from the database
 * @returns {Promise<void>}
 * @throws {Error} If the users are not deleted
 */
export async function deleteAllUsers() {
  let db = null;
  try {
    db = await connectToDatabase();
    const usersCollection = db.collection(COLLECTION_MAIN);
    const result = await usersCollection.deleteMany({
      
    });

  } catch (error) {
    console.error(error);
    throw new Error("Users not deleted!")
  } finally {
    //if (db != null) {
    //  await db.close();
    //  console.log('Disconnected from MongoDB');
    //}
  }
}

/**
 * Creates a machine view in the database
 * @param {object} machine
 * @returns {Promise<void>}
 */
export async function createMachineView(machine) {
  let db = null;
  try {
    if (machine === undefined) {
      throw new Error("Machine not created!");
    }

    db = await connectToDatabase();
    const machinesCollection = db.collection(COLLECTION_ANALYTICS);
    const result = await machinesCollection.insertOne(machine.toJSON());

    if (result.insertedCount !== 1) {
      throw new Error("Machine view not created! Rows affected: ", result.insertedCount)
    }
  } catch (error) {
    console.error(error);
    throw new Error("Machine not created!");
  } finally {
    //if (db != null) {
    //  await db.close();
    //  console.log('Disconnected from MongoDB');
    //}
  }
}


/**
 * Reads a machine view from the database
 * @param {object} filter
 * @returns {Promise<[]>}
 */
export async function readMachinesView(filter) {
  let db = null;
  try {
    db = await connectToDatabase();
    const machinesCollection = db.collection(COLLECTION_ANALYTICS);
    const machinesObj = await machinesCollection.find(filter).toArray();
    return machinesObj;

  } catch (error) {
    console.error(error);
    throw new Error("Machines not read!")
  } finally {
    //if (db != null()) {
    //  await db.close();
    //  console.log('Disconnected from MongoDB');
    //}
  }
}


/**
 * Deletes machine views from the database by filter
 * @param {object} filter
 * @returns {Promise<void>}
 */
export async function deleteMachinesView(filter) {
  let db = null;
  try {
    db = await connectToDatabase();
    const machinesCollection = db.collection(COLLECTION_ANALYTICS);
    const result = await machinesCollection.deleteMany(filter);

  } catch (error) {
    console.error(error);
    throw new Error("Machines not deleted!")
  } finally {
    //if (db != null) {
    //  await db.close();
    //  console.log('Disconnected from MongoDB');
    //}
  }
}


/**
 * Creates an incident in the database
 * @param {Object} incident The incident object to be created
 * @returns {Promise<void>} Promise indicating the success of the operation
 * @throws {Error} If the incident object is not provided or creation fails
 */

export async function deleteIncident(id) {
  const db = await connectToDatabase();
  const incidentsCollection = db.collection("incidents");
  const result = await incidentsCollection.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount !== 1) {
      throw new Error("Incident not deleted!");
  }
}

// Delete all incidents
export async function deleteAllIncidents() {
  const db = await connectToDatabase();
  const incidentsCollection = db.collection("incidents");
  const result = await incidentsCollection.deleteMany({});
  if (result.deletedCount === 0) {
    throw new Error("Incidents not deleted!");
  }
}

export async function readAllIncidents() {
  const db = await connectToDatabase();
  const incidentsCollection = db.collection("incidents");
  const incidents = await incidentsCollection.find({}).toArray();
  return incidents.map(incident => new Incident(incident));
}


/**
 * Creates an incident in the database
 * @param {Object} incident The incident object to be created. Expected to have 'email' and 'text' properties.
 * @returns {Promise<void>} Promise indicating the success of the operation
 * @throws {Error} If the incident object is not provided or creation fails
 */
export async function createIncident(incident) {
  let db = null;
  try {
    if (!incident || !incident.email || !incident.text) {
      throw new Error("Invalid incident data provided!");
    }

    db = await connectToDatabase();
    const incidentsCollection = db.collection("incidents"); // Using a specific collection for incidents

    // Insert the incident into the collection
    const result = await incidentsCollection.insertOne({
      email: incident.email,
      text: incident.text,
      machineId: incident.machineId,
      machineName: incident.machineName,
      machineBuilding: incident.machineBuilding,
      status: "open",
      type: "incident"
    });

    /*if (result.insertedCount !== 1) {
      throw new Error("Incident not created! Rows affected: " + result.insertedCount);
    }*/
  } catch (error) {
    console.error("Failed to create incident: ", error);
    throw new Error("Failed to create incident due to an error.");
  } finally {
    //if (db) {
     // await db.close();
    //}
  }
}

  /**
 * Reads incidents from the database by email
 * @param {Object} filter - This should contain the email to filter by.
 * @returns {Promise<Array>}
 * @throws {Error} If the incidents cannot be read
 */
export async function readIncidents( email ) {
  let db = null;
  try {
    if (!email) {
      throw new Error("Email parameter is required!");
    }
    console.log("email: ", email);
    db = await connectToDatabase();
    const incidentsCollection =  db.collection("incidents");
    
    // Query the database for incidents by email
    const incidents = await incidentsCollection.find({ email: email }).toArray();
    
    if (!incidents.length) {
      throw new Error("No incidents found for the provided email.");
    }

    return incidents.map(incident => new Incident(incident));

  } catch (error) {
    console.error("Failed to read incidents: ", error);
    throw new Error("Failed to read incidents due to an error.");
  } finally {
    //if (db) {
      //await db.close();
    //}
  }
}


export async function readIncidentId(id) {
  let db = null;
  try {
    if (!id || id.length !== 24) {
      throw new Error("Invalid ID provided.");
    }

    db = await connectToDatabase();
    console.log("Database connected, accessing collection.");
    const incidentsCollection = db.collection(COLLECTION_MAIN);
    
    console.log("Looking for incident with _id:", id);
    const incidentObj = await incidentsCollection.findOne({_id: id});

    console.log("Search result:", incidentObj);
    if (!incidentObj) {
      throw new Error("Incident not read! Incident not found in DB");
    }


    const incident = new Incident();
    incident.email = incidentObj.email;
    incident.machineId = incidentObj.machineId;
    incident.machineName = incidentObj.machineName; 
    incident.machineBuilding = incidentObj.machineBuilding;
    incident.text = incidentObj.text;
    incident.status = incidentObj.status;
    incident.type = incidentObj.type;
    
    return incident;
  } catch (error) {
    console.error(error);
    throw new Error("Incident not read!");
  } finally {
    //if (db != null) {
    //  await db.close();
    //}
  }
}


/**
 * Updates a user in the database
 * @param {string} id
 * @param {Incident} updatedIncidentData
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function updateIncident(id, updatedIncidentData) {
  let db = null;
  try {
    if (id === undefined || updatedIncidentData === undefined) {
      throw new Error("Incident not updated! id or updatedIncidentData is undefined!");
    }

    db = await connectToDatabase();
    const incindentsCollection = db.collection(COLLECTION_MAIN);
    const result = await incindentsCollection.updateOne({
      _id: new Object(id),
    }, { $set: updatedIncidentData.toJSON() });

    //if (result.modifiedCount !== 1) {
    //  throw new Error("User not updated!")
    //}
  } catch (error) {
    console.error(error);
    throw new Error("Incident not updated!");
  } finally {
    //if (db != null) {
    //  await db.close();
    //}
  }
}
