const express = require('express');
const router = express.Router();
const User = require('../models/pangolin');
const passport = require('passport');


router.post('/signup', async (req, res) => {
    console.log('user from req.body >>>', req.body);
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        famille: req.body.famille,
        race: req.body.race,
        nourriture: req.body.nourriture,
        friends: req.body.friends
    });
    // const newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        // we login the user that has just been created
        req.logIn(req.body, (err) => {
            if (err) {
                console.error('err in register | req.logIn()', err);
            }
        });
        res.status(201).json(user);
    });
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
}));

router.get('/success', (req, res) => {
    res.status(200).json({
        msg: 'logged in',
        user: req.user
    });
});

router.get('/failure', (req, res) => {
    res.status(401).json({
        msg: 'Identifiants incorrects',
        level: "error"
    });
});

router.get('/signout', (req, res) => {
    req.logOut();
    res.status(200).json({
        msg: 'logged out successfully'
    });
});

module.exports = router;