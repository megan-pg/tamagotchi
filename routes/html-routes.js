const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/create.html'));
});

router.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/list.html'));
});

router.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/tamagotchi.html'));
});

// Place this route below all others to send he index.html file
// to any request that is not explicitly defined above
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
