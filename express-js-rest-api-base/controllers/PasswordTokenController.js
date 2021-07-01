const passwordToken = require("../models/PasswordToken");
const User = require("../models/User");

class PasswordTokenController {
    async recoverPassword(req, res) {
        let email = req.body.email;

        var result = await passwordToken.create(email);

        if (result.msgError) {
            res.status(401).send(result.msgError);
            console.log(result.msgError)
            return;
        }
        if (result.status) {
            // Aqui envia o email
            res.status(201).send(result.token.toString());
        } else {
            res.status(406).send(result.error)
        }
    }

    async changePassword(req, res) {
        let { password, token } = req.body;
        let isValidToken = await passwordToken.validate(token);

        if (isValidToken.error != undefined) {
            res.status(401).send(isValidToken.error);
            return;
        }

        if (isValidToken.status) {
            await User.changePassword(password, isValidToken.token.userId, isValidToken.token.token);
            res.status(201).send("Senha alterada")
        }
        else
            res.status(406).send("Token inválido")
    }
}

module.exports = new PasswordTokenController