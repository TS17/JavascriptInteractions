const express = require("express"),
stream = require('stream'),
app = express();

app.get('/start', function(req, res) {
    res.sendFile(__dirname + "/download.html")
});

app.get('/localFile', function(req, res){
    console.log(req.query.fname)
    
    var file = __dirname + "/testFile";
    res.download(file);
});


app.get('/createFile', function(req, res){
    let config = req.query,
    fileName = config.fileName,
    fileContent = config.fileContent;

    var fileContents = Buffer.from(fileContent, "utf-8");

    var readStream = new stream.PassThrough();
    readStream.end(fileContents);
  
    res.set('Content-disposition', 'attachment; filename=' + fileName);
    res.set('Content-Type', 'text/plain');
  
    readStream.pipe(res);
});
app.listen(3000, () => console.log("example app listening on port 3000"))
