const knex = require("../config/db");
// const User = require("./User");

class PasswordToken {

    async findByEmail(email) {
        try {
            const data = await knex.select(["id"]).table("users").where({ email })

            if (data.length > 0) {
                return { status: true, data: data[0] }
            }
            else
                return { status: false }
        } catch (error) {
            return { error };
        }
    }

    async create(email) {
        try {
            let user = await this.findByEmail(email);
            let token = Date.now();
            let userId = user.data.id;

            if (user.status) {
                await knex.insert({ token, userId, used: 0 }).table("passwordtoken");
                return { status: true, token }
            }
            else
                return { status: false, error: "O email passado não existe no banco de dados!" }
        } catch (error) {
            return { msgError: error }
        }
    }

    async setUsed(token){
        await knex.update({used: 1}).table("passwordtoken").where({token});
    }

    async validate(token) {
        try {
            let result = await knex.select().from("passwordtoken").where({ token });
            if (result.length > 0) {
                let tk = result[0];

                if (tk.used > 0) {
                    return { status: false };
                }
                else
                    return { status: true, token: tk }
            }
            else
                return false
        } catch (error) {
            return { error }
        }
    }
}

module.exports = new PasswordToken