const router = require('express').Router();
const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');

// keeping this for testing but, likely don't want this exposed later on
router.get('/', (req, res) => {
    User.findAll({})
    .then((results) => res.json(results))
    .catch((err) => { throw err });
});

// get animals / user
router.get('/:username/animals', (req, res) => {
    User.findOne({
        where: { username : req.params.username},
        include: Animal
    })
    // todo is there a better way to do this? the findone above returns the password as well
    .then((data) => res.json(data.Animals)) 
    .catch((err) => { throw err });
});

// create
router.post('/create', (req, res) => {
    const { email, username, password } = req.body;

    User.create({
        email: email,
        username: username,
        password: password,
        uuid: uuidv4()
    })
    .then((results) => res.send(`${results.username} created successfully!`))
    .catch((err) => res.json(`Something went wrong: ${err.errors[0].message}`))
});

// login
router.get('/:username/login', (req, res) => {
    // todo credentials with passport
    // todo this may turn into a very different endpoint seeing as its for logging in
    // todo so not sure what will be done with the animal being returned
    User.findOne({
        where: { username : req.params.username},
        include: Animal
    })
    .then((results) => res.json(results.username)) // todo, needs to return as logged in or a token
    .catch((err) => { console.log(err) });
});

// update
// todo: not sure about this one, as an update to the user, may require updates to all of their animals
// todo: what would we allow to be updated? email, pass, username
// todo maybe leave this one alone till everything else is buttoned up

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
    User.findOne({
        where: {uuid : uuid}
    })
    .then(async (user) => {
        return await user.destroy(); 
    })
    .then((result) => res.send(`${result.username} succesfully deleted!`))
    .catch((err) => res.send('Something went wrong.'))
});

module.exports = router;