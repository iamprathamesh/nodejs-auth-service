const userService = require('./user-service');
const appProp = require('../../properties');
const jwt = require('jsonwebtoken');

class AuthService {

    constructor() { }

    static login(email, password) {
        return new Promise((resolve, reject) => {
            userService.getUser(email, password).then((user) => {
                const userJSON = { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email}
                jwt.sign(userJSON, appProp.jwtSecret, (error, token) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve("Bearer " + token);
                    }
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    static signUp(user) {
        return new Promise((resolve, reject) => {
            userService.validateNewUser(user).then(() => {
                userService.saveUser(user).then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    static verifyToken(req, res, next) {
        const authHeader = req.headers['authorization'];

        if (authHeader != null) {
            const splittedToken = authHeader.split(" ");
            const token = splittedToken[1];
            jwt.verify(token, appProp.jwtSecret, (err, authData) => {
                if (err) {
                    res.status(403).json({
                        message: "Invalid token"
                    });
                } else {
                    next();
                }
            });
        } else {
            res.status(403).json({
                message: "Please provide a token"
            });
        }
    }

}

module.exports = AuthService;