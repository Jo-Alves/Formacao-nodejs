const express = require("express");
const User = require("./User")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const secret = require("./secret.js")

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());


app.get("/", (req, res) => {
    res.json("Olá mundo! Joelmir e Valdirene");
})

app.delete("/user/:email", async(req, res) => {
    const { email } = req.params;
    try {
        await User.destroy({ where: { email } });
        res.status(204).send({})
    } catch (error) {
        res.status(500)
    }
})

app.get("/users", async(req, res) => {
    let users = await User.findAll();
    // console.log(users)
    res.status(200).json(users)
})

app.post("/user", async(req, res) => {
    const { name, email, password } = req.body;

    if (name === "") {
        res.status(400).send({ err: "Nome vazio!" })
        return
    }
    if (email === "") {
        res.status(400).send({ err: "email vazio!" })
        return
    }
    if (password === "") {
        res.status(400).send({ err: "password vazio!" })
        return
    }


    let user = await User.findOne({ where: { email } })

    if (user) {
        res.statusCode = 400
        res.json({ error: "E-mail já cadastrado!" })
        return
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.create({
        name,
        email,
        password: hash
    }).then(() => {
        res.status(201).json({ email });
    }).catch(err => {
        res.status(500);
    });
})

app.post("/auth", async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } })

    if (!user) {
        res.status(400).json({ error: "Usuário não existe!" })
        return
    }

    let result = await bcrypt.compare(password, user.dataValues.password)

    if (!result) {
        res.status(403).json({ error: "A senha está incorreta!" })
        return;
    }

    try {
        let token = jwt.sign({ email }, secret, { expiresIn: "48h" })
        res.status(200).json({ token })
    } catch (error) {
        res.status(500)
    }
})

module.exports = app