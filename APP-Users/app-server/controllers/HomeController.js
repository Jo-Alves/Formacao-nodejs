class HomeController {

    async index(req, res) {
        res.send("APP EXPRESS! - Guia do programador");
    }

    validate(req, res) {
        res.send("ok")
    }
}

module.exports = new HomeController();