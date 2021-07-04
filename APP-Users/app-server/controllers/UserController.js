const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../security/secret");

class UserController {
    async saveUser(req, res) {
        const { name, email, password, role } = req.body;
        const id = req.body.id;

        if (!name.trim()) {
            res.status(400).json({ err: "O campo nome deve ser preenchida!" })
            return;
        }
        if (!email.trim()) {
            res.status(400).json({ err: "O campo email deve ser preenchida!" })
            return;
        }
        if (!id) {
            if (!password.trim())
                res.status(400).send({ err: "O campo password deve ser preenchida!" })
            return;
        }

        if (id) {
            const user = await User.save({ id, name, email, role });
            if (user.status) {
                res.status(204).send("Tudo OK!");
            } else {
                res.status(401).send(user.err);
            }
        } else {
            const emailExists = await User.findEmail(email);

            if (emailExists.status) {
                res.status(403).send({ err: "Este email já existe!" })
                return;
            }

            const user = await User.save({ name, email, password, role });
            if (user.status) {
                res.status(200).send("Tudo OK!");
            } else {
                res.status(401).send(user.err);
            }
        }
    }

    async findAllUser(req, res) {
        const users = await User.find()
        if (users.status) {
            res.status(200).json(users.data);
        } else {
            res.status(404).json({ err: users.error });
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
        } else
            res.status(404).send({ err: "Usuário não existe!" });
    }

    async deleteUser(req, res) {
        try {
            const data = await User.delete(req.params.id);
            if (data.status) {
                res.status(204).send("Usuário excluido com sucesso!");
            } else
                res.status(400).json({ err: "O usuário não existe!" });

        } catch (error) {
            res.status(400).json({ err: "Houve um erro no servidor. Tente novamente mais tarde!" });
        }
    }

    async login(req, res) {
        let { email, password } = req.body;

        if (!email.trim()) {
            res.status(400).json({ err: "Informe o email!" });
            return;
        }

        if (!password.trim()) {
            res.status(400).json({ err: "Informe a senha!" });
            return;
        }

        let user = await User.findByEmail(email);

        if (user.status) {
            let result = await bcrypt.compare(password, user.data.password);

            if (result) {
                let token = jwt.sign({ email, role: user.data.role }, secret);

                res.status(200).json({ token })
            } else
                res.status(403).send({ err: "Senha incorreta!" });
        } else {
            res.status(401).json({ status: false, err: "O Usuário não existe!" });
        }
    }
}

module.exports = new UserController