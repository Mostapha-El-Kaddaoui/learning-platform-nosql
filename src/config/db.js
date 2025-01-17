// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Un contrôleur contient la logique métier et les traitements associés à une entité ou une opération, tandis qu'une route gère l'acheminement des requêtes HTTP vers un contrôleur spécifique.

// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Séparer la logique métier des routes permet d'améliorer la modularité, la réutilisabilité, et d'isoler les différentes couches d'application pour une meilleure maintenance et flexibilité.
const { MongoClient } = require("mongodb");
const redis = require("redis");
const config = require("./env");

let mongoClient, redisClient, db;

async function connectMongo() {
  console.log("Mongo try to connect");
  try {
    mongoClient = new MongoClient(config.mongodb.uri);
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log("Connected to MongdDB");
    return db;
  }catch(error) {
    console.error('MongoDB connection error:', error);

    // Retry
    await new Promise(resolve => setTimeout(resolve, 5000));
    return connectMongo();    
  }
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({
      url: config.redis.uri
    });

    await redisClient.connect();
    console.log("Connected to redis");
    return redisClient;    
  } catch (error) {
    console.error('Redis connection error:', error);
    // Retry
    await new Promise(resolve => setTimeout(resolve, 5000));
    return connectRedis();
  }
}

module.exports = {
  connectMongo,
  connectRedis,
  getDb: () => db,
  getRedisClient: () => redisClient
};


