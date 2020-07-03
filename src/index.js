var express = require('express');
var http = require('http');

const path= require('path');
//make sure you keep this order
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
app.set('port',process.env.PORT || 3000)
app.use(express.static(path.join(__dirname,'public')));
console.log(path.join(__dirname,'public'))
//importa el archivo socket.js
var arrayData=[];

require('./socket')(io,arrayData);

server.listen(app.get('port'),()=>{
    console.log("Conectado en el http://localhost:3000")
});