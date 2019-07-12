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

var resultClass = 5;

app.get('/pdf',async (req,res)=>{
  generatePdf.generateReport(5);
  await delay(3000);
  var tempFile = __dirname + "/report.pdf";
  fs.readFile(tempFile, function (err,data){
     res.contentType("application/pdf");
     res.send(data);
  });
})

app.post('/upload', async (req, res) => {
  // move image to this folder
  // fs.rename(req.files.image.path, __dirname+"/"+req.files.image.name, (err)=>{
  //   if(err) throw err;
  //   res.redirect('/pdf');
  // });

  fs.readFile(req.files.image.path, function (err, data) {
            if (err) throw err;
            console.log('File read!');

            // Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
                console.log('File written!');
            });

            // Delete the file
            fs.unlink(oldpath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        });
  // perform preprocessing and save stuff to this folder
  // predict and reset the resultClass variable
  // console.log(req.fields); // contains non-file fields
  // console.log(req.files); // contains files

});

app.listen(3000);

console.log('Listening in port 3000');
