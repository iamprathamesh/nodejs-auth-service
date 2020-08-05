const userModel = require('../models/users');

class UserService {

    constructor() {}

    static getUser(email, password) {
        return new Promise((resolve, reject) => {
            userModel.findOne({email, password}, (error, result) => {
                if(error) {
                    reject(error);
                } else {
                    if(result == null) {
                        const err = new Error('Wrong email/password');
                        err.status = 422;
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            });
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