class Processor{
    static Process(data){
        let a = data.split("\r\n");
        let rows = [];

        a.forEach(row => {
            var arr = row.split(",")
            rows.push(arr);
        });
      
        return rows;
    }
}

module.exports = Processor