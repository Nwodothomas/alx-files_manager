#!/usr/bin/node

/*
 *  setup server connection
 */

const redisClient = require('../utils/redis');
const dbClient = require("../utils/db");

const AppController = {
  getStatus: async (req, res) => {
    try {
      const redisStatus = await checkRedis();
      const dbStatus = await checkDatabase();
      if (redisStatus && dbStatus) {
        res.status(200).json({ redis: true, db: true });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getStats: async (req, res) => {
    try {
      // Assuming you have functions to count users and files in the database
      const userCount = await countUsers();
      const fileCount = await countFiles();

      res.status(200).json({ users: userCount, files: fileCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = AppController;
