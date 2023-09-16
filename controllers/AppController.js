#!/usr/bin/node

/*
 *  setup server connection
 */

const redisClient = require('../utils/redis');
const dbClient = require("../utils/db");

class AppController {
  static async getStatus(req, res) {
    const redisStatus = await dbClient.isAlive();
    const dbStatus = await dbClient.isAlive();

    const response = {
      redis: redisStatus,
      db: dbStatus,
    };

    return res.status(200).json(response);
  }

  static async getStats(req, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();

    const response = {
      users: usersCount,
      files: filesCount,
    };

    return res.status(200).json(response);
  }
}

module.exports = AppController;
