const path = require('path');
const router = require('express').Router();

// login
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

<<<<<<< Updated upstream
// create user
=======
>>>>>>> Stashed changes
router.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/create.html'));
});

<<<<<<< Updated upstream
// list animals
=======
>>>>>>> Stashed changes
router.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/list.html'));
});

<<<<<<< Updated upstream
// play
=======
>>>>>>> Stashed changes
router.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/tamagotchi.html'));
});

<<<<<<< Updated upstream
// instructions
router.get('/how-to', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/instructions.html'));
});

// user/animal
router.get('/play/:username/:animal', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/tamagotchi.html'));
});

// catch-all
=======
// Place this route below all others to send he index.html file
// to any request that is not explicitly defined above
>>>>>>> Stashed changes
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
