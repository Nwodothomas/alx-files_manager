#!/usr/bin/node

import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const userExist = await dbClient.userExist(email);
    if (userExist) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const newUser = await dbClient.createUser(email, password);

    return res.status(201).json({ id: newUser.insertedId, email });
  }
}

export default UsersController;
