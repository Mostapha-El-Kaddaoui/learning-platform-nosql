// Question: Pourquoi créer des services séparés ?
// Réponse: Pour encapsuler la logique métier spécifique et rendre les interactions avec la base de données ou les services externes plus maintenables et isolées.
const { ObjectId } = require("mongodb");
const db = require("../config/db");

async function findOneById(collectionName = "courses", id) {
  try {
    const database = await db.connectMongo();    
    return await database.collection(collectionName).findOne({
      _id: id,
    });
  } catch (error) {
    console.error("MongoDB find error: ", error);
    throw error;
  }
}

async function insertOne(collectionName = "courses", data) {
  try {
    const database = await db.connectMongo();
    console.log("insertion with mongo");
    return await database.collection(collectionName).insertOne(data);
    
  } catch (error) {
    console.error("MongoDB insert error: ", error);
    throw error;
  }
}

async function findMany(collectionName = "courses", query = {}, options = {}) {
  try {
    const database = await db.connectMongo();
    return await database.collection(collectionName).find(query, options).toArray();
  } catch (error) {
    console.error("MongoDB findMany error: ", error);
    throw error;
  }
}

// Export des services
module.exports = {
  findOneById, 
  insertOne, 
  findMany
};
