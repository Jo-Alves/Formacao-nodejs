const express = require("express")
const app = express();
const bodyParser = require('body-parser')
const connection = require("./model/database")
const pergunta = require("./model/Pergunta")
const resposta = require("./model/Resposta")
// database
connection
	.authenticate()
	.then(() => {
		console.log("conexão feita com o banco de dados!")
	})
	.catch(msgErro => {
		console.log(msgErro)
	})
	

app.set("view engine", 'ejs')
app.use(express.static("public"))

// body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// router
app.get("/", (req, res) => {
	// seleciona todas as linhas da tabela
	pergunta.findAll({raw: true})
		.then(perguntas => {
			res.render('index', {
				perguntas
			})
		})
})

app.get("/perguntar", (req, res) => {
	res.render("perguntas")
})

app.post("/salvarpergunta", (req, res) => {
	let titulo = req.body.title
	let descricao = req.body.description
	// insere dados no banco de dados
	pergunta.create({
		tiRStulo,
		descricao
	})
	.then(() => {
		res.redirect("/")
	})
	.catch(error => {
		res.send("Desculpe, houve um erro no banco de dados. " + error)
	})
})

app.post("/responder", (req, res) => {
	let corpo = req.body.corpo
	let perguntaId = req.body.pergunta
	resposta.create({
		corpo,
		perguntaId
	})
	.then(() => {
		res.redirect(`/pergunta/${perguntaId}`)
	})
})

app.get("/pergunta/:id", (req, res) => {
	let id = req.params.id
	pergunta.findOne({
		where: {id}
	})
	.then(pergunta =>  {
		if(pergunta)
				resposta.findAll({
					where: {perguntaId: pergunta.id},
					order: [
						['id', 'DESC']
					]
				}).
				then(respostas => {
					res.render('pergunta', {
						pergunta,
						respostas
					})
				})
		else
			res.redirect("/")
	})
})

app.listen(8080, () => {
	console.log("App rodando!")
})