const pdfDoc = require('pdfkit');
const fs = require('fs');


module.exports = {
  generateReport:
    function(a)
    {
      var bg = "O+ve";
      if(a == 1){
        bg = "O+ve";
      }else if(a == 2){
        bg = "O-ve";
      }else if(a == 3){
        bg = "A+ve";
      }else if(a == 4){
        bg = "A-ve";
      }else if(a == 5){
        bg = "B+ve";
      }else if(a == 6){
        bg = "B-ve";
      }else if(a == 7){
        bg = "AB+ve";
      }else if(a == 8){
        bg = "AB-ve";
      }
      const doc = new pdfDoc;
      doc.pipe(fs.createWriteStream('report.pdf'));
      doc.fontSize(32).text("Online Blood typing Labs",100,80).moveDown();
      doc.fontSize(24).text("Your Blood Group is :" + bg);
      doc.end();
    }
}
