const app = require("./app")
const sequelize = require("./config/db")

sequelize.authenticate()
    .then(() => {
        console.log("Conexão Feita com sucesso!")
    })
    .catch(error => {
        console.error(error);
    })

app.listen(3000, () => {
    console.log("Servidor rodando...")
})