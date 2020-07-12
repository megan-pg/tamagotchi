const router = require('express').Router();
const { Animal, User } = require('../models');

// keeping this for testing but, likely don't want this exposed later on
router.get('/', (req, res) => {
  Animal.findAll({})
    .then((results) => res.json({ animals: results, status: 200 }))
    .catch((err) => res.json({ msg: `Something went wrong: ${err}`, status: 500 }));
});

// get one animal by id
router.get('/:id', User.authenticateToken, (req, res) => {
  Animal.findOne({
    where: { uuid: req.params.id },
  })
    .then((results) => res.json({ msg: results, status: 200 }))
    .catch((err) => res.json({ msg: `Something went wrong: ${err}.`, status: 404 }));
});

// create
router.post('/create', User.authenticateToken, (req, res) => {
  // user clicks "CREATE" > post req is sent here with the following json
  // {"name": "animals name", "difficulty": "chosen difficulty here", "UserUuid": "usser-uuid-here"}
  const {
    name, UserUuid, difficulty, species,
  } = req.body;
  const obj = Animal.generateInitialStats(name, UserUuid, difficulty, species);

  Animal.create(obj)
    .then((results) => res.json({ msg: `${results.name} created successfully!`, status: 201 }))
    .catch((err) => res.json({ msg: `Something went wrong: ${err}.`, status: 400 }));
});

// update an individual stat from user input
router.put('/update', User.authenticateToken, (req, res) => {
  // the following code presumes the actions will share the attribute name of the animal
  // user clicks "FEED" > put req is sent here with the following json
  // {"uuid": "animals-uuid-here", "action": "hunger"}

  const { uuid, action } = req.body;
  Animal.findOne({
    where: { uuid },
  })
    .then(async (animal) => {
      if (!Animal.legalActions(action)) {
        throw new Error('Invalid Action!');
      }

      const obj = await Animal.updateStat(
        animal.dataValues.difficulty,
        animal.dataValues[action],
        action,
        true,
      );

      return animal.update(obj);
    })
    .then((result) => res.json({ msg: `Successfully updated ${result.name}. ${action} is now ${result[action]}`, status: 202 }))
    .catch((err) => res.json({ msg: `Something went wrong: ${err}`, status: 400 }));
});

// update multiple stats from frontend clock
router.put('/clock', (req, res) => {
  const { uuid } = req.body;
  Animal.findOne({
    where: { uuid },
  })
    .then(async (animal) => {
      const obj = await Animal.updateStats(animal);
      animal.update(obj)
        .then((result) => res.json({ msg: result, status: 202 }));
    })
    .catch((err) => res.json({ msg: `Something went wrong ${err}`, status: 500 }));
});

// update name
router.put('/rename', User.authenticateToken, (req, res) => {
  // user is viewing the update animal view, and has changed the name
  // user clicks "SAVE" > post req is sent here with the following json
  // {"uuid": "animals-uuid-here", "name": "animals new name here"}
  const { name, uuid } = req.body;
  Animal.findOne({
    where: { uuid },
  })
    .then(async (animal) => animal.update({ name }))
    .then((result) => res.json({ msg: result, status: 202 }))
    .catch((err) => res.json({ msg: `Something went wrong: ${err}.`, status: 400 }));
});

// delete
router.delete('/delete', User.authenticateToken, (req, res) => {
  const { uuid } = req.body;
  Animal.findOne({
    where: { uuid },
  })
    .then(async (animal) => animal.destroy())
    .then((result) => res.json({ msg: `Successfully deleted ${result.name}!`, status: 202 }))
    .catch((err) => res.json({ msg: `Something went wrong: ${err}.`, status: 500 }));
});

module.exports = router;
