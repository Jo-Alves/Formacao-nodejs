const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../security/secret");

class UserController {
    async saveUser(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const id = req.body.id;

            if (!name.trim()) {
                res.status(400).send("O campo name deve ser preenchida!")
                return;
            }
            if (!email.trim()) {
                res.status(400).send("O campo email deve ser preenchida!")
                return;
            }
            if (!password.trim()) {
                res.status(400).send("O campo password deve ser preenchida!")
                return;
            }

            if (id) {
                const user = await User.save({ id, name, email, role });
                if (user.status) {
                    res.status(204).send("Tudo OK!");
                }
                else {
                    res.status(401).send(user.error);
                }
            } else {
                const emailExists = await User.findEmail(email);

                if (emailExists.status) {
                    res.status(406).json({ error: "Este email já existe!" })
                    return;
                }

                const user = await User.save({ name, email, password, role });
                if (user.status) {
                    res.status(201).send("Tudo OK!");
                }
                else {
                    res.status(401).send(user.error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    async findAllUser(req, res) {
        const users = await User.find()
        if (users.status) {
            res.status(200).json(users.data);
        }
        else {
            res.status(404).send(users.error);
        }
    }

    async findUserById(req, res) {
        if (isNaN(req.params.id)) {
            res.send("informe um 'id' válido")
            return;
        }

        const users = await User.findById(parseInt(req.params.id))
        if (users.error) {
            res.status(500).send(users.error);
            return;
        }

        if (users.status) {
            res.status(200).json(users.data);
        }
        else
            res.status(404).send("Usuário não existe!");
    }

    async deleteUser(req, res) {
        try {
            const data = await User.delete(req.params.id);
            if (data.status) {
                res.status(204).send("Usuário excluido com sucesso!");
            }
            else
                res.status(400).send("O usuário não existe!");

        } catch (error) {

        }
    }

    async login(req, res) {
        let { email, password } = req.body;

        let user = await User.findByEmail(email);

        if (user) {
            let result = await bcrypt.compare(password, user.data.password);

            if (result) {
                let token = jwt.sign({ email, role: user.data.role }, secret);

                res.status(200).json({ token })
            }
            else
                res.status(406).send("Senha incorreta");
        }
        else {
            res.json({ status: false });
        }
    }
}

module.exports = new UserController