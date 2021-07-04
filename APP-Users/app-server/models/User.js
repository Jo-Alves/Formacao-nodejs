const knex = require("../config/db");
const bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User {
    async find() {
        try {
            const data = await knex.select(["id", "name", "email", "role"]).table("users");
            return { status: true, data }
        } catch (error) {
            return { status: false, err }
        }
    }

    async findById(id) {
        try {
            const data = await knex.select(["id", "name", "email", "role"]).table("users").where({ id })
            if (data.length > 0) {
                return { status: true, data }
            } else
                return { status: false }
        } catch (error) {
            return { error };
        }
    }

    async findByEmail(email) {
        try {
            const data = await knex.select(["id", "name", "email", "role"]).table("users").where({ email })

            if (data.length > 0) {
                return { status: true, data: data[0] }
            } else
                return { status: false }
        } catch (error) {
            return { error };
        }
    }
    async findEmail(email) {
        try {
            const data = await knex.select(["id"]).table("users").where({ email })

            if (data.length > 0) {
                return { status: true, data }
            } else
                return { status: false }
        } catch (error) {
            return { error };
        }
    }

    async delete(id) {
        try {
            const userById = await this.findById(id);
            if (userById.status) {
                await knex.delete().table("users").where({ id })
                return { status: true }
            } else
                return { status: false }
        } catch (error) {
            return { error };
        }
    }

    async save(user) {
        try {
            const { id, name, email, password, role } = user;
            if (id) {
                await knex.update({ name, email, role }).table("users").where({ id: parseInt(id) })
                return { status: true }
            } else {
                let hash = await bcrypt.hash(password, 10);

                await knex.insert({ name, email, password: hash, role }).table("users");
                return { status: true }
            }
        } catch (error) {
            console.log(error)
            return ({ status: false, error })
        }
    }

    async changePassword(newPassword, id, token) {
        let hash = await bcrypt.hash(newPassword, 10);
        await knex.update({ password: hash }).table("users").where({ id })
        await PasswordToken.setUsed(token);
    }
}

module.exports = new User