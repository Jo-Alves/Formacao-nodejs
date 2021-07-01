const Reader = require("./class/Reader");
const Processor = require("./class/Processor");
const Table = require("./class/Table");
const htmlParser = require("./class/htmlParser");
const Writer = require("./class/Writer");
var PDFWriter = require("./class/pdfWriter");

let reader = new Reader();
let writer = new Writer();

async function main(){
    const data = await reader.Read("./file/family.csv");
    let dataProcessor = Processor.Process(data);

    let users = new Table(dataProcessor);
    let html =  await htmlParser.parser(users);

    writer.Write(`${Date.now()}.html`, html);
    PDFWriter.WritePDF(`${Date.now()}.pdf`, html);
}

main();