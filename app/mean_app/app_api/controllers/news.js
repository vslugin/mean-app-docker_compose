var mongoose = require( 'mongoose' );
var newsSchema = mongoose.model('news');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.list = function (req, res) {
    newsSchema.find().exec(function (err, news) {
        sendJsonResponse(res, 200, news);
    })
};

module.exports.create = function (req, res) {
    newsSchema.create(req.body, function (err, news) {
       if(err){
           sendJsonResponse(res, 400, err);
       } else {
           sendJsonResponse(res, 201, news);
        }
    });
};

module.exports.update = function (req, res) {

    var id = req.params.id;

    if(!id){
        sendJsonResponse(res, 404, {
            message: "Not found"
        });
        return;
    }

    newsSchema.findById(id)
        .select('-title -body')
        .exec(function (err, news) {
            if(!news){
                sendJsonResponse(res, 404, {
                    message: "News not found"
                });
                return;
            } else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }

            if(req.body.title){
                news.title = req.body.title;
            }

            if(req.body.body){
                news.body = req.body.body;
            }

            news.save(function (err, news) {
                if(err){
                    sendJsonResponse(res, 400, err);
                } else {
                    sendJsonResponse(res, 200, news);
                }
            });
        });
};

module.exports.find = function (req, res) {

    var id = req.params.id;

    if(!id){
        sendJsonResponse(res, 404, {
            message: "Not found"
        });
        return;
    }

    newsSchema.findById(id)
        .exec(function (err, news) {

            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }

            sendJsonResponse(res, 200, news);
        });
};

module.exports.delete = function (req, res) {

    var id = req.params.id;

    if(id){
        newsSchema.findByIdAndRemove(id).exec(function (err) {
            if(err){
                sendJsonResponse(res, 400, err);
            } else {
                sendJsonResponse(res, 201, null);
            }
        });
    } else {
        sendJsonResponse(res, 400, {
            message: "no news"
        });
    }
};