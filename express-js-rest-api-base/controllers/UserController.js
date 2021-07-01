const User = require("../models/User");

class UserController {
    async saveUser(req, res) {
        try {
            const { name, email, password } = req.body;
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
                const user = await User.save({ id, name, email, role: 0 });
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

                const user = await User.save({ name, email, password, role: 0 });
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
}

module.exports = new UserController