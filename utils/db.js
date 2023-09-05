const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    const dbUrl = `mongodb://${host}:${port}`;

    this.connected = false;
    this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });

    this.client.connect()
      .then(() => {
        this.connected = true;
      })
      .catch((err) => {
        console.error(`MongoDB connection error: ${err}`);
      });
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    if (!this.connected) {
      return 0;
    }
    const usersCollection = this.client.db(this.database).collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    if (!this.connected) {
      return 0;
    }
    const filesCollection = this.client.db(this.database).collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;