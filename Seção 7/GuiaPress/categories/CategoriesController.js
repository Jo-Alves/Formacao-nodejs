const express = require("express")
const router = express.Router()
const category = require("./Category")
const slugify = require("slugify")

router.get("/admin/categories/new", (req, res) => {
	res.render('admin/categories/new')
})

router.post("/categories/save", (req, res) => {
	let title = req.body.title
	if(title){
		category.create({
			title,
			// slug : title.split(" ").join("-")
			slug: slugify(title)
		}).
		then(() => {
			res.redirect("/")
		})
	}
	else{
		res.redirect('/admin/categories/new')
	}
})

router.get("/categories", (req, res) => {
	res.send("Rota categorias")
})

router.get("/admin/categories", (req, res) => {
	category.findAll().then(categories => {		
		res.render("admin/categories/index", {categories})
	})
})

module.exports = router