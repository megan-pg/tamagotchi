const router = require('express').Router();
const {User, Animal} = require('../models');
const { v4: uuidv4 } = require('uuid');

// --------------------- USER ---------------------
// keeping this for testing but, likely don't want this exposed later on
router.get('/users/', (req, res) => {
    User.findAll({})
    .then((results) => {
        console.log(results);
        res.json(results);
    })
    .catch((err) => { throw err });
});

// create
router.post('/users/create', (req, res) => {
    const { email, username, password } = req.body;

    User.create({
        email: email,
        username: username,
        password: password,
        uuid: uuidv4()
    })
    .then((results) => res.json(results)) // todo send created message
    .catch((err) => {
        // todo unique email & username required
        // todo send a response telling user that
        throw err 
    });
});

// login
router.get('/users/login/:username', (req, res) => {
    // todo credentials with passport
    // todo this may turn into a very different endpoint seeing as its for logging in
    // todo so not sure what will be done with the animal being returned
    User.findOne({
        where: { username : req.params.username},
        include: Animal
    })
    .then((results) => res.json(results))
    .catch((err) => { throw err });
});

// delete
router.delete('/users/delete/', (req, res) => {
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
    .then((result) => res.json(result)) //todo send delete msg
    .catch((err) => {throw err})
});

// --------------------- ANIMAL ---------------------
// create
// delete
// view all, per user
// update
// view one

// router.get("/burgers", (req, res) => {
//   burger.selectAll().then((data) => {
//     console.log('get: ', data);
//     res.json(data);
//   });
// });

// router.post("/burgers/create", (req, res) => {
//   let { burger_name } = req.body;
//   burger.insertOne(burger_name)
//   .then((data) => {
//     status = data.changedRows == 1 ? 200 : 500;
//     //  todo how to send the status back?
//     // res.sendStatus(status);
//   })
//   .catch((err) => console.log(err))
//   .finally(() => res.redirect('/'));
// });

// router.post("/burgers/devour/:id", (req, res) => {
//   let {id} = req.params;
//   burger.updateOne(id, true)
//   .then((data) => {
//     status = data.changedRows == 1 ? 200 : 500;
//     //  todo how to send the status back?
//     // res.sendStatus(status);
//   })
//   .catch((err) => console.log(err))
//   .finally(() => res.redirect('/'));
// });

// router.post("/burgers/vomit/:id", (req, res) => {
//   let {id} = req.params;
//   let status;
//   burger.updateOne(id, false)
//   .then((data) => {
//      status = data.changedRows == 1 ? 200 : 500;
//     //  todo how to send the status back?
//     // res.sendStatus(status);
//   })
//   .catch((err) => console.log(err))
//   .finally(() => res.redirect('/'));
// });

module.exports = router;