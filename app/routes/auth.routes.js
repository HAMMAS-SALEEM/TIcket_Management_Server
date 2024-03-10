import verifySignUp from "../middlewares/verifySignUp.js";
import {signin, signup} from '../controllers/auth.controller.js'

export default (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next()
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateNameOrEmail,
        ],
        signup
    )

    app.post("/api/auth/signin", signin)
}