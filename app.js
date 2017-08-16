var http = require('http');
var fs = require('fs');
var url = require('url');

var index = fs.readFileSync('index.html');

var server = http.createServer(function(req,res){
    //console.log(req);

    let filename = url.parse(req.url).pathname;
if(filename.length===1) filename = "/index.html";
filename = __dirname+filename;


    fs.readFile(filename,function(err,data){

        if(err){
            res.writeHead(404,{'ContentType':'text/plain'});
            res.end("Page "+filename+" not found");
        }else{
            res.writeHead(200,{'ContentType':'text/html'});
            res.end(data);
        }



    });

});

server.listen(5005);