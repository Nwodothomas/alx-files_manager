#!/usr/bin/node

const { MongoClient } = require('mongodb');
const mongo = require('mongodb');
const { pwdHashed } = require('./utils');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config()

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    const dbUrl = `mongodb://${host}:${port}`;
    this.connected = false;
    this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.connected = true;
    }).catch((err) => console.log(err.message));
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    try {
      await this.client.connect();
      const users = await this.client.db(this.database).collection('users').countDocuments();
      return users;
    } catch (error) {
      console.error(error.message);
      return -1; // Return -1 to indicate an error
    }
  }

  async nbFiles() {
    try {
      await this.client.connect();
      const files = await this.client.db(this.database).collection('files').countDocuments();
      return files;
    } catch (error) {
      console.error(error.message);
      return -1; // Return -1 to indicate an error
    }
  }

  async createUser(email, password) {
    try {
      const hashedPwd = pwdHashed(password);
      await this.client.connect();
      const user = await this.client.db(this.database).collection('users').insertOne({ email, password: hashedPwd });
      return user;
    } catch (error) {
      console.error(error.message);
      return null; // Return null to indicate an error
    }
  }

  async getUser(email) {
    try {
      await this.client.connect();
      const user = await this.client.db(this.database).collection('users').findOne({ email });
      return user;
    } catch (error) {
      console.error(error.message);
      return null; // Return null to indicate an error
    }
  }

  async getUserById(id) {
    try {
      const _id = new mongo.ObjectID(id);
      await this.client.connect();
      const user = await this.client.db(this.database).collection('users').findOne({ _id });
      return user;
    } catch (error) {
      console.error(error.message);
      return null; // Return null to indicate an error
    }
  }

  async userExists(email) {
    const user = await this.getUser(email);
    return !!user; // Return true if user exists, false otherwise
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
