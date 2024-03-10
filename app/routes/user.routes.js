import { allAccess, userBoard } from "../controllers/user.controller.js";
import authJwt from "../middlewares/authjwt.js";

export default (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/test/all",
        allAccess
    )

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        userBoard
    )
}