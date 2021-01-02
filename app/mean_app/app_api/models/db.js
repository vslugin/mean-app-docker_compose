var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://@mongo/mysite';

mongoose.connect(dbURI);

require('./news');
require('./users');

mongoose.connection.on('connected', () => {

    console.log("Mongoose connected to " + dbURI);
});

mongoose.connection.on('error', function(err){
    console.log("Mongoose connection error: " + err);
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose disconnected");
});


var readLine = require("readline");
if (process.platform === "win32"){
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ("SIGINT", function (){
        process.emit ("SIGINT");
    });
}

var gracefullShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through " + msg);
        callback();
    });
};

process.once('SIGUSR2', function () {
    gracefullShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function () {
    gracefullShutdown('app shitdown', function () {
        process.exit(0);
    });
});

process.on('SIGTERM', function () {
    gracefullShutdown('heroku app shutdown', function () {
        process.exit(0);
    });
});


// test
/*
var newsSchema = mongoose.model('news');

newsSchema.create({
    title: "Суперновость2",
    body: "Мы это сделали2"
}, function (err, addedObj) {
   console.log("error", err);
   console.log("мы добавили", addedObj);
});*/
