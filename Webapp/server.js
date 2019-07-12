const express = require('express');
const formidableMiddleware = require('express-formidable');
const fs = require('fs');
const delay  = require('delay');
const generatePdf = require('./generateReport')

var app = express();


app.set('view engine','ejs');
app.use(formidableMiddleware());


app.get('/',(req, res)=>{
  res.render('index');
});

app.get('/pdf',async (req,res)=>{
  generatePdf.generateReport(5);
  await delay(3000);
  var tempFile = __dirname + "/report.pdf";
  fs.readFile(tempFile, function (err,data){
     res.contentType("application/pdf");
     res.send(data);
  });
})

app.post('/upload', (req, res) => {
  console.log(req.fields); // contains non-file fields
  console.log(req.files); // contains files
  res.redirect('/pdf');
});

app.listen(3000);

console.log('Listening in port 3000');
