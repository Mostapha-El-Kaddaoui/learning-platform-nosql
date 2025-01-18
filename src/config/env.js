// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Valider les variables d'environnement au démarrage permet d'éviter des erreurs inattendues pendant l'exécution de l'application
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Si une variable requise est manquante, l'application risque de rencontrer des erreurs lors de son exécution.

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}
 


module.exports = {
  mongodb: {
    uri: "mongodb+srv://admin:pass@cluster0.idicj.mongodb.net/ENSET?retryWrites=true&w=majority",
    dbName: "ENSET"
  },  
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000,
  validateEnv
};
