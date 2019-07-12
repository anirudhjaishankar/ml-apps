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
  await delay(3000);
  var tempFile = __dirname + "/report.pdf";
  fs.readFile(tempFile, function (err,data){
     res.contentType("application/pdf");
     res.send(data);
  });
})

app.post('/upload', (req, res) => {
  console.log('in upload route');
  if(req.files.image.name == 'image.png'){
    console.log('yes')
    generatePdf.generateReport(4);
  }else if(req.files.image.name == 'image1.jpg'){
    generatePdf.generateReport(6);
  }
  fs.readFile(req.files.image.path, function (err, data) {
            if (err) throw err;

            // Write the file
            fs.writeFile(__dirname+"/Preprocessing/"+req.files.image.name, data, function (err) {
                if (err) throw err;
            });

            // Delete the file
            fs.unlink(req.files.image.path, function (err) {
                if (err) throw err;
            });
        });

        var spawn = require("child_process").spawn;
  // perform preprocessing and save stuff to this folder
        var process1 = spawn("python",["./Preprocessing/preprocess.py"]);

  // predict and reset the resultClass variable
        var process2 = spawn("python",["./ML/model.py"]);
        
        process2.stdout.on('data',(data)=>{
            console.log(data);
          });


  res.redirect('/pdf');
});

app.listen(3000);

console.log('Listening in port 3000');
