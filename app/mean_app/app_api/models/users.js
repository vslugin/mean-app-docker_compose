var mongoose = require( 'mongoose' );
var crypto = require( 'crypto' );
var jwt = require( 'jsonwebtoken' );

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    }
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        name: this.name,
        exp: parseInt(expiry.getTime()/1000)
    }, 'thisIsSecret');
};

mongoose.model('user', userSchema);