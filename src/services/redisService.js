// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Utilisez des TTL appropriés pour éviter les données obsolètes et gérez les erreurs de façon rigoureuse pour garantir la cohérence des données.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :Utilisez des clés lisibles et uniques, maintenez une structure hiérarchique, et évitez les clés trop longues ou trop complexes.
const db = require('../config/db')

async function cacheData(key, data, ttl = 3600) {
  try {
    const redisClient = await db.connectRedis();
    await redisClient.setEx(
      key, 
      ttl, 
      JSON.stringify(data)
    );
  } catch (error) {
    console.error("Redis cache error ", error);
    throw error;
  }
}

async function getCacheData(key) {
  try {
    const redisClient = await db.connectRedis();
    const data = await redisClient.get(key);
    console.log(data);

    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Redis get error:', error);
    throw error;
  }
  
}

module.exports = {
  cacheData,
  getCacheData
};
