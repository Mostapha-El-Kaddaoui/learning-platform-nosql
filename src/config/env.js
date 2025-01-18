
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
    //uri: "mongodb+srv://username:password@cluster.xxxxx.mongodb.net/database?retryWrites=true&w=majority",
    //dbName: "ENSET"
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },  
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000,
  validateEnv
};
