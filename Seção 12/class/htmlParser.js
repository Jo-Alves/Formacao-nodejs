const ejs =  require("ejs");

class htmlParser{
    static async parser(table){
        return await ejs.renderFile("./views/table.ejs", {header: table.header, rows: table.rows})
    }
}

module.exports = htmlParser;