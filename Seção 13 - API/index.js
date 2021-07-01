const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./db");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
// app.use(express.bodyParser());

app.get("/games", (req, res) => {
    res.statusCode = 200
    res.json(DB.games);
})

app.get("/game/:id", (req, res) => {
    if (isNaN(req.params.id))
        res.sendStatus(400);
    else {
        let game = DB.games.find(game => game.id == parseInt(req.params.id));

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game)
        }
        else
            res.sendStatus(404);
    }
})

app.post("/game", (req, res) => {
    let { title, price, year } = req.body;

    console.log(req.body);

    let index = DB.games.length - 1;
    let id = DB.games[index].id;

    DB.games.push({
        id: ++id,
        title,
        price,
        year
    })

    res.sendStatus(200);

})

app.delete("/game/:id", (req, res) => {
    if (isNaN(req.params.id))
        res.sendStatus(400);
    else {
        let index = DB.games.findIndex(game => game.id == req.params.id);

        if (index == -1)
            res.sendStatus(404);
        else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
})

app.put('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        let game = DB.games.find(game => game.id == id)
 
        if (game != undefined) {
            console.log(req.body)
            let {title, year, price} = req.body
 
            if (title != undefined) {
                game.title = title
            }
 
            if (year != undefined) {
                game.year = year
            }
 
            if (price != undefined) {
                game.price = price
            }
 
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    }
})

app.listen(3000, () => {
    console.log("API Rodando!")
})