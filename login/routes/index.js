
/*
 * GET home page.
 */

exports.index = function(req, res){
    if(req.session.user){
        res.send("Hello " + req.session.user);
    } else {
        res.send("Please login to continue");
    }
    //res.render('index', { title: 'Express' });
};
