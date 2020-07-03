const router = require('express').Router();
const { Animal } = require('../models');

// keeping this for testing but, likely don't want this exposed later on
router.get('/', (req, res) => {
    Animal.findAll({})
    .then((results) => res.json(results))
    .catch((err) => { throw err });
});

// get one animal
router.get('/:id', (req, res) => {
    // todo limit this to user that is authenticated?
    Animal.findOne({
        where: { uuid : req.params.id },
    })
    .then((results) => res.json(results))
    .catch((err) => { throw err });
});

// create
router.post('/create', (req, res) => {
    // user clicks "CREATE" > post req is sent here with the following json 
    // {"name": "animals name here", "difficulty": "chosen difficulty here", "UserUuid": "usser-uuid-here"}
    const { name, UserUuid, difficulty } = req.body;
    const obj = Animal.generateInitialStats(name, UserUuid, difficulty);

    Animal.create(obj)
    .then((results) => res.send(`${results.name} created successfully!`))
    .catch((err) => res.send(err));
});

// update an individual stat from user input
router.put('/update/', (req, res) => {
    // the following code presumes the actions will share the attribute name of the animal
    // user clicks "FEED" > put req is sent here with the following json 
    // {"uuid": "animals-uuid-here", "action": "hunger"}

    const { uuid, action } = req.body;
    Animal.findOne({
        where: {uuid : uuid}
    })
    .then(async (animal) => {
        if(!Animal.legalActions(action)){
            throw 'Illegal Action!';
        }

        const obj = Animal.updateStat(animal.dataValues.difficulty, animal.dataValues[action], action)

        return await animal.update(obj);     
    })
    .then((result) => res.send(`Successfully updated ${result.name}. ${action} is now ${result[action]}`))
    .catch((err) => res.send(`Something went wrong: ${err}`))
});

// update via scheduler
// seeing as this logic is both moving to the frontend and only running on the animals being viewed
// the utility of this route is diminished
router.put('/clock/', (req, res) => {
    Animal.findAll({})
    .then(async (animals) => {
        let promises = [];
        for(animal of animals){
            let obj = Animal.updateStats(animal);
            promises.push(animal.update(obj));
        }

        Promise.all(promises)
        .then((values) => res.send(`${values.length} animals successfully updated!`))
        .catch((err) => res.send(`Something went wrong: ${err}`));
    })
    .catch((err) => res.send(`Something went wrong: ${err}`));
});

// update name
router.put('/rename', (req, res) => {
    // user is viewing the update animal view, and has changed the name
    // user clicks "SAVE" > post req is sent here with the following json 
    // {"uuid": "animals-uuid-here", "name": "animals new name here"}
    const { name, uuid } = req.body;
    Animal.findOne({
        where: {uuid : uuid}
    })
    .then(async (animal) => {
        const obj = {
            name: name
        }

        return await animal.update(obj);  
    })
    .then((result) => res.send(`Successfully updated ${result.name}'s name!`))
    .catch((err) => res.send(`Something went wrong: ${err}.`))
});

// delete
router.delete('/delete/', (req, res) => {
    // todo will likely need to double check authentication here, lest we have randos hitting delete
    // something like:
    //     if(authToken == valid){
    //         do the thing
    //     }else{
    //         get bent
    //     }
    const { uuid } = req.body;
    Animal.findOne({
        where: {uuid : uuid}
    })
    .then(async (animal) => {
        return await animal.destroy(); 
    })
    .then((result) => res.send(`Successfully deleted ${result.name}!`))
    .catch((err) => res.send(`Something went wrong: ${err}.`))
});

module.exports = router;