var bcrypt = require('bcrypt'),
    mongoose = require('mongoose'),
    User = require('../models/user.js');
    SALT_FACTOR = 10,
    MAX_LOGIN_ATTEMPTS = 5,
    LOGIN_LOCK_TIME = 60 * 60 * 1000;


//Gets
exports.newuser = function(req, res){
    res.render('newuser', { title: 'Add New User' });
};

exports.login = function(req, res){
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('login', { title: 'Login' });
    }
};

exports.logout = function(req, res) {
    req.session.destroy(function() {
        res.redirect('/');
    });
};

//Posts
exports.adduser = function(req, res) {
    var uname = req.body.username;
    var uemail = req.body.email;
    var upassword = req.body.password;

    if (upassword == "" || uname == "" || uemail == "" )
    {
        res.end("Missing fields");
    }
    var salt = bcrypt.genSaltSync(SALT_FACTOR);
    var uhash = bcrypt.hashSync(upassword, salt);
    
    var newuser = new User({
        username: uname,
        email: uemail,
        password: uhash});
   
    newuser.save(function (err) {
        if (err) {
            res.send("Login error " + err);
        }
        else {
            res.send("Congrats " + uname);
        }
    });
};

exports.loginuser = function(req, res) {
    var uname = req.body.username;
    var upassword = req.body.password;
    
    User.findOne({username: "jlewis"}).exec(function (err, doc) {
        if (err || doc == null ) {
            res.send("Error logging in");
        }
        else {
            success = bcrypt.compareSync(upassword, doc.password)
            if (success) {
                req.session.user = doc.username;
                res.redirect('/');
            }
            else {
                res.send("Invalid password");
            }
        }
    });
};
