const route = require('express').Router();
const parser = require('body-parser').json();
const User = require('../db/user');

route.post('/signup', parser, (req, res) => {
    const { email, password, name, phone } = req.body;
    User.signUp(email, password, name, phone)
    .then(() => res.status(201).send({ message: 'OK' }))
    .catch(err => res.status(401).send({ message: err.message }));
});

route.post('/signin', parser, (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(400).send({ err: err.message }));
});

module.exports = route;
