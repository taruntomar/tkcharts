var http = require('http');
var fs = require('fs');
var url = require('url');

var index = fs.readFileSync('index.html');
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var server = http.createServer(function (req, res) {
    //console.log(req);

    let filename = url.parse(req.url).pathname;
    if (filename === '/telemetrydata') {
        var today = new Date();
        var date =  (today.getMonth() + 1) + '/' + today.getDate()+'/'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+":"+today.getMilliseconds();
        var dateTime = date + ' ' + time;
        res.writeHead(200, { 'ContentType': 'application/json' });
        let tmpdata = [{ 'time': dateTime, 'value': getRandomInt(1, 16) }];
         res.write(JSON.stringify(tmpdata));
        res.end();
    }
    else if (filename === '/cpufirstdata') {
        res.writeHead(200, { 'ContentType': 'application/json' });
        let tmpdata = [
            { 'time': '8/17/2017 01:45:00', 'value': 2 }
            , { 'time': '8/17/2017 2:45:00', 'value': 3 }
            , { 'time': '8/17/2017 2:46:00', 'value': 4 }
            , { 'time': '8/17/2017 2:47:00', 'value': 5 }
            , { 'time': '8/17/2017 2:48:00', 'value': 6 }
            , { 'time': '8/17/2017 2:49:00', 'value': 8 }
            , { 'time': '8/17/2017 2:50:00', 'value': 12 }
            , { 'time': '8/17/2017 2:51:00', 'value': 10 }
            , { 'time': '8/17/2017 2:52:00', 'value': 11 }
            , { 'time': '8/17/2017 2:53:00', 'value': 15 }
            , { 'time': '8/17/2017 2:54:00', 'value': 13 }
            , { 'time': '8/17/2017 2:55:00', 'value': 12 }
            , { 'time': '8/17/2017 2:56:00', 'value': 10 }
            , { 'time': '8/17/2017 2:57:00', 'value': 14 }
            , { 'time': '8/17/2017 2:58:00', 'value': 12 }
        ];
        res.write(JSON.stringify(tmpdata));
        res.end();
    }

    if (filename.length === 1) filename = "/index.html";
    filename = __dirname + filename;


    fs.readFile(filename, function (err, data) {

        if (err) {
            res.writeHead(404, { 'ContentType': 'text/plain' });
            res.end("Page " + filename + " not found");
        } else {
            res.writeHead(200, { 'ContentType': 'text/html' });
            res.end(data);
        }



    });

});

server.listen(5005);