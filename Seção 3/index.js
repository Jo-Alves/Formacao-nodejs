const express = require("express") //importando o express
const app = express() // iniciando o express

app.get("/", (req, resp) => {
	resp.send("<h1>Bem vindo ao Guia do programador!</h1>")
})

app.get("/blog", (req, resp) => {
	resp.send("Bem vindo ao meu blog!")
})

//:marca? - Params não obriagatório
app.get("/canal/youtube/:marca?", (req, resp) => {
	let marca = req.params.marca
	if(marca){
		resp.send(`Seja bem vindo ao meu canal do youtube: <strong>${marca}</strong>`)
		return;
	}
	resp.send("Seja bem vindo ao meu canal do youtube!")
})

app.get("/channel/youtube", (req, resp) => {
	let channel = req.query["channel"]
	
	if(channel)
		resp.send(`<strong>Channel</strong> ${channel}`)
	else
		resp.send(`Nenhum canal fornecido`)
})

app.get("/ola/:nome",(req, resp) => {
	let name = req.params.nome
	resp.send(`<strong>Nome: </strong> ${name}`)
})

app.get("/ola/:nome/:empresa",(req, resp) => {
	let nome = req.params.nome
	let empresa = req.params.empresa
	resp.send(`
		<strong>Nome:</strong> ${nome}<br>
		<strong>Empresa:</strong> ${empresa}
	`)
})

app.listen(3000, error => {
	if(error){
		console.log("Ocorreu um erro!")
	}
	else{
		console.log("Servidor iniciado com sucesso!")
	}
})