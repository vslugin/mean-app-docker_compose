module.exports.getNewsList = function (req, res) {

    var mongoose = require( 'mongoose' );
    var newsSchema = mongoose.model('news');

    newsSchema.find().exec(function (err, news) {


        res.render('admin-news', { title: 'Список', list: news });


    });
};

module.exports.createNews = function (req, res) {

    console.log("createNews: debug", req);

    res.send('qwerty');
};

module.exports.spa = function (req, res) {
    res.render('layout-spa', { title: 'SPA Angular' });
};