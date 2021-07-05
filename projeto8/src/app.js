const express = require("express");
const app = express();
const user = require("./User")

app.use(express.urlencoded({ extended: false }))
app.use(express.json());


app.get("/", (req, res) => {
    res.json("Olá mundo! Joelmir e Valdirene");
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

    user.create({
        name,
        email,
        password
    }).then(() => {
        res.status(201).json({ email });
    }).catch(err => {
        res.status(500);
    });
})

module.exports = app