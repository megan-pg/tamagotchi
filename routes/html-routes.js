const path = require('path');
const router = require('express').Router();

// login
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// create user
router.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/create.html'));
});

// list animals
router.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/list.html'));
});

// play
router.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/tamagotchi.html'));
});

// instructions
router.get('/how-to', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/instructions.html'));
});

// user/animal
router.get('/play/:username/:animal', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/tamagotchi.html'));
});

// catch-all
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
