var knex = require("../config/db");
var User = require("./User");

class PasswordToken {

    async findByEmail(email) {
        try {
            var result = await knex.select(["id", "email", "password", "role", "name"]).where({ email: email }).table("users");

            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }

        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async create(email) {
        var user = await this.findByEmail(email);
        if (user != undefined) {
            try {
                var token = Date.now();
                await knex.insert({
                    userId: user.id,
                    used: 0,
                    token: token // UUID
                }).table("passwordtoken");

                return { status: true, token: token }
            } catch (err) {
                console.log(err);
                return { status: false, err: err }
            }
        } else {
            return { status: false, err: "O e-mail passado não existe no banco de dados!" }
        }
    }

    async validate(token) {
        try {
            var result = await knex.select().where({ token: token }).table("passwordtoken");

            if (result.length > 0) {

                var tk = result[0];

                if (tk.used) {
                    return { status: false };
                } else {
                    return { status: true, token: tk };
                }

            } else {
                return { status: false };
            }
        } catch (err) {
            return { status: false };
        }
    }

    async setUsed(token) {
        await knex.update({ used: 1 }).where({ token: token }).table("passwordtoken");
    }
}

module.exports = new PasswordToken();