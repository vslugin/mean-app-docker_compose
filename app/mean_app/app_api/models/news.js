var mongoose = require( 'mongoose' );

var newsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: String
});

mongoose.model('news', newsSchema);