var http = require("http")

http.createServer((req, resp) => {
	resp.end("<h1>Bem vindo ao meu site!</h1><h4>Guia do programador</h4>")
}).listen(3000)