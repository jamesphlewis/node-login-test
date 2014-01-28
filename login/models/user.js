var mongoose = require('mongoose');

var db = mongoose.createConnection('localhost:27017/database');

var schema = new mongoose.Schema({
    'username': { type: String, required: true, index: { unique: true } },
    'password': { type: String, required: true },
    'email': { type: String, required: true },
    'loginAttempts': { type: Number, required: true, default: 0 },
    'lockUntil': { type: Number }
});

var User = db.model('Users', schema);

module.exports = User;
