const userService = require('./user-service');

class AuthService {

    constructor() { }

    static login(username, password) {

    }

    static signUp(user) {
        return new Promise((resolve, reject) => {
            userService.validateNewUser(user).then().catch((error) => {
                reject(error);
            }).then(() => {
                userService.saveUser(user).then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });
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