#!/usr/bin/node

const express = require('express');
const AppController = require('../controllers/AppController');

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
