const jwt = require("jsonwebtoken")
const secret = require("../security/secret");

module.exports = async(req, res, next) => {
    try {
        const authToken = req.headers["authorization"]

        if (authToken) {
            // const bearer = authToken.split(" ");
            // let token = bearer[1]
            let token = authToken.split(" ")[1];

            let decoded = await jwt.verify(token, secret);
            // console.log(await jwt.decode(token));
            if (decoded.role == 1) {
                next();
            } else {
                res.status(401).send("Você não está autorizado!");
                return;
            }
        } else {
            res.status(401).send("Você não está autorizado!");
            return;
        }
    } catch (error) {
        res.status(400).send({ error: error })
    }
}