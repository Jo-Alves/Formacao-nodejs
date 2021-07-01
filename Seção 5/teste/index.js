const express = require("express")
const app = express();

app.set("view engine", 'ejs')
app.use(express.static("public"))

app.get("/:name/:lang", (req, res) => {
	let name = req.params.name.toUpperCase()
	let lang = req.params.lang
	let exibirMsg = false
	const products = [
		{name: "Barra de Chocolate", price: 12.50},
		{name: "Bombom", price: 10.50},
		{name: "Trufas de Maracujá", price: 2.00},
		{name: "Sorvete", price: 15.35},
		{name: "Picolé", price: 3},
		{name: "Chu-Chup", price: 1.25}
	]
	res.render('index', {
		name,
		lang,
		empresa: 'Las Technology',
		exibirMsg,
		products
	})
})

app.listen(8080, () => {
	console.log("App rodando!")
})