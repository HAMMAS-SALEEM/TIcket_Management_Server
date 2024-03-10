import db from "../models/index.js";
import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.user;

const signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
  .then(() => {
    res.status(200).send({ message: "User is successfully created"})
  })
  .catch((error) => {
    res.status(500).send({ message: error.message })
  })
}

const signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then((user) => {
        if(!user) {
          return res.status(404).send({ message: "User not found."})
        }
        
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if(!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password"
          })
        }
        const token = jwt.sign(
            {id: user.id}, 
            config.secret,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400
        })
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
        })
    })
    .catch((error) => {
        res.status(500).send({message: error.message})
    })
}

export { signup, signin }