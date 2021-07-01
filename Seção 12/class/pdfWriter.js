const pdf = require("html-pdf");

class PDFWriter{
    static WritePDF(fileName, html){
        pdf.create(html, {}, error => {} ).toFile(fileName);
    }
}

module.exports = PDFWriter;