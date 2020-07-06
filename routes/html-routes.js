const path = require('path');
const express = require('express');

const router = express.Router();
const root = { root: path.join(__dirname, '../public') };

// login
router.get('/', (req, res) => res.sendFile('index.html', root));

// create user
router.get('/create', (req, res) => res.sendFile('create.html', root));

// list animals
router.get('/list', (req, res) => res.sendFile('list.html', root));

// instructions
router.get('/how-to', (req, res) => res.sendFile('instructions.html', root));

// user/animal
// todo should i put a check here on the username and animal?
router.get('/play/:username/:animal', (req, res) => res.sendFile('tamagotchi.html', root));

// catch-all
router.get('*', (req, res) => res.sendFile('index.html', root));

module.exports = router;
