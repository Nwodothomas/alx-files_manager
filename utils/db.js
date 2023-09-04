// Import the required MongoDB packages
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

class DBClient {
  constructor() {
    // Get the MongoDB connection details from environment variables or use defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    const dbUrl = `mongodb://${host}:${port}`;
    
    // Initialize MongoDB client with the connection URL
    this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });
    this.connected = false;

    // Connect to MongoDB in the constructor
    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.connected = true;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    try {
      const usersCount = await this.client.db(this.database).collection('users').countDocuments();
      return usersCount;
    } catch (error) {
      console.error('Error counting users:', error.message);
      return -1; // Return -1 to indicate an error
    }
  }

  async nbFiles() {
    try {
      const filesCount = await this.client.db(this.database).collection('files').countDocuments();
      return filesCount;
    } catch (error) {
      console.error('Error counting files:', error.message);
      return -1; // Return -1 to indicate an error
    }
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
