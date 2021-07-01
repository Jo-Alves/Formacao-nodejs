const express = require("express");
const dbConnection = require("./db");
const games = require("./dbGames");
const users = require("./dbUser")
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const jwtSecrety = "alsdkdyehfdjdhdbfdhfdb";

dbConnection.authenticate()
    .then(() => {
        console.log("Conexão Feita com sucesso!")
    })
    .catch(error => {
        console.error(error);
    })

function auth(req, res, next) {
    const authToken = req.headers["authorization"];
    if (authToken) {
        const token = authToken.split(" ")[1];
        jwt.verify(token, jwtSecrety, (error, data) => {
            if (error) {
                res.status(401);
                res.json({ error: "token inválido!" });
            }
            else {
                req.token = token;
                req.loggedUser = { id: data.id, email: data.email }
                next();
            }
        })
    }
    else {
        res.status(401).json({ error: "token inválido!" })
    }
}

app.get("/games", auth, (req, res) => {
    games.findAll({ raw: true })
        .then(g => {
            res.statusCode = 200
            res.json(g);
        })
})

app.post("/user", async (req, res) => {
    let { name, email, password } = req.body;
    console.log(req.body)
    users.create({
        name,
        email,
        password,
        createdAt: new Date().getDate(),
        updatedAt: new Date().getDate()
    })
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.statusCode = 501
            res.send("Desculpe! Houve algum problema no banco de dados!");
        })
})

app.get("/users", (req, res) => {
    users.findAll({ raw: true })
        .then(users => {
            res.statusCode = 200;
            res.json(users);
        })
})

app.post("/auth", async (req, res) => {
    let { email, password } = req.body;

    try {
        const user = await users.findOne({
            where: { email }
        })

        if (user.email) {
            if (user.password == password) {
                jwt.sign({
                    id: user.id,
                    email: user.email
                }, jwtSecrety, {
                    expiresIn: "48h"
                }, (error, token) => {
                    if (error) {
                        res.status(400).json({ error: "Falha interna" })
                    }
                    else {
                        res.status(200);
                        res.json({ token })
                    }
                });
            }
            else {

                res.status(401).send({ msg: "Credenciais inválidas" })
            }
        }
    }
    catch (error) {
        res.status(404);
        res.send({ email: "Email inválido!" });
    }
})

app.get("/game/:id", auth, (req, res) => {
    if (isNaN(req.params.id))
        res.sendStatus(400);
    else {
        let id = req.params.id
        games.findOne({
            where: { id }
        })
            .then(data => {
                res.statusCode = 200;
                if (data)
                    res.json(data)
                else
                    res.sendStatus(404)
            })
            .catch(error => {
                res.sendStatus(404);

            })
    }
})

app.post("/game", auth, (req, res) => {
    let { title, price, year } = req.body;

    let date = new Date();
    games.create({
        title,
        price,
        year,
        createdAt: date.getDate(),
        updatedAt: date.getDate(),
    }).then(() => {
        res.sendStatus(200);
    }).
        catch(error => {
            res.send(`Desculpe, houve um problema no banco de dados. ${error}`);
        })
})

app.delete("/game/:id", auth, (req, res) => {
    if (isNaN(req.params.id))
        res.sendStatus(400);
    else {
        let id = parseInt(req.params.id);

        games.destroy({ where: { id } })
            .then(() => {
                res.sendStatus(204);

            })
            .catch(error => {
                res.sendStatus(501);
            })
    }
})

app.put('/game/:id', auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        let { title, year, price } = req.body

        games.update(
            {
                title,
                year,
                price,
                updatedAt: new Date().getDate()
            },
            {
                where: { id }
            })
            .then(() => {
                res.sendStatus(204);
            })
            .catch(error => {
                res.sendStatus(501);
            }
            )
    }
})

app.listen(3000, () => {
    console.log("API Rodando!")
})