const userModel = require('../models/users');

class UserService {

    constructor() {}

    static getUser(email) {
        return new Promise((resolve, reject) => {
            //login code
            userModel
        });
    }

    static validateNewUser(user) {
        return new Promise((resolve, reject) => {
            userModel.find({email: user.email}, (error, result) => {
                if(error) {
                    reject(error);
                } else {
                    if(result.length == 0) {
                        resolve();
                    } else {
                        const err = Error('Email already exists');
                        err.status = 422;
                        reject(err);
                    }
                }
            });
        });
    }

    static saveUser(user) {
        return new Promise((resolve, reject) => {
            user.save((error, result) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = UserService;