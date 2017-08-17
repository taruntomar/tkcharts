var http = require('http');
var fs = require('fs');
var url = require('url');

var index = fs.readFileSync('index.html');

var server = http.createServer(function(req,res){
    //console.log(req);

    let filename = url.parse(req.url).pathname;

    if(filename==='/cpufirstdata'){
         res.writeHead(200,{'ContentType':'application/json'});
         let tmpdata = [{ 'time':'8/17/17 10:45:00','value':1}
                        ,{ 'time':'8/17/17 11:45:00','value':2}
                        ,{ 'time':'8/17/17 12:45:00','value':3}
                        ,{ 'time':'8/18/17 4:45:00','value':4}
                        ,{ 'time':'8/18/17 6:45:00','value':5}
                        ,{ 'time':'8/18/17 7:45:00','value':6}
                        ,{ 'time':'8/19/17 3:45:00','value':8}
                        ,{ 'time':'8/19/17 7:45:00','value':12}
                        ,{ 'time':'8/19/17 8:45:00','value':10}
                        ,{ 'time':'8/19/17 9:45:00','value':11}
                        ,{ 'time':'8/20/17 10:45:00','value':15}
                        ,{ 'time':'8/20/17 11:45:00','value':13}
                        ,{ 'time':'8/20/17 12:45:00','value':12}
                        ,{ 'time':'8/20/17 12:46:00','value':10}
                        ,{ 'time':'8/20/17 12:47:00','value':14}
                        ,{ 'time':'8/21/17 10:45:00','value':12}
                       ];
         res.write(JSON.stringify(tmpdata));
         res.end();
    }

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