const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const authService = require('../services/auth-service');
const mongoose = require('mongoose');

router.post('/login', (req, res) => {

});

router.post('/signUp', (req, res, next) => {
    const user = new userModel({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    authService.signUp(user).then((user) => {
        res.status(200).json(user);
    }).catch((error) => {
        next(error);
    });
});

module.exports = router;
