import db from '../models/index.js'

const User = db.user;

const checkDuplicateNameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username already exists"
            })
            return;
        }
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email already exists"
            })
            return;
        }
        next();
    })
    })
};

const verifySignUp = {
    checkDuplicateNameOrEmail
};

export default verifySignUp;