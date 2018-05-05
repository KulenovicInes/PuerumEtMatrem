var mongoUtil = require('../Models/mongoUtil');
var db = mongoUtil.getDb();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;


var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var getPasswordHash = function (password, salt) {
   return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

var createToken = function (id, email, name) {
    var expiry = new Date();

    return jwt.sign({
        _id: id,
        email: email,
        name: name,
        exp: parseInt(expiry.setMinutes(expiry.getMinutes() + 60))
    }, "verySecretSecret"); // DO NOT KEEP SECRET IN THE CODE!

}


var checkToken = function (token, callback) {
    var expiry = new Date();
    jwt.verify(token, 'verySecretSecret', function (err, decoded) {
        if (err) {
             callback(err, {}); 
            /*
              err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
                expiredAt: 1408621000
              }
            */
        }
        else if (decoded.exp > parseInt(expiry.getTime())) {
            callback(null, {valid : true});
        }
        
        callback(null, {valid: false});
    });
}

module.exports.register = function (req, res) {
    var salt = crypto.randomBytes(16).toString('hex');
    db.collection('users').insert({ username: req.body.username, passwordHash: getPasswordHash(req.body.password, salt), email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, salt: salt }, (err, user) => {
        if (err) return console.log(err);
        res.status(200);
        return res.json({
            'success': true, 'message': 'Real estate added successfully',
            "token": createToken(user.ops[0]._id, user.ops[0].email, user.ops[0].firstName)
        });
    });

};

module.exports.login = function (req, res) {
    db.collection('users').findOne({ username: req.body.username}, function (err, user){
        if (err) throw err;
        if (Object.keys(user).length === 0) {
            res.status(401);
            return res.json({ message: "User not found" });
        }
        else if (user.passwordHash != getPasswordHash(req.body.password, user.salt)) {
            res.status(401);
            return res.json({ message: "Wrong username or password" });
        }
        else {
            res.status(200);
            return res.json({
                "token": createToken(user._id, user.email, user.username)
            });
        }
        });
   


};

module.exports.profile = function (req, res) {
   // console.log(req.body.token);
    checkToken(req.body.token, function (err, result) {
        if (err) {
            res.status(401).json({
                "message": "UnauthorizedError: private profile"
            });
            return res;
        }
        else {
            console.log(result);
            if (result.valid) {
                db.collection('users').findOne({ _id: ObjectId(req.body._id) }, function (err, user) {
                    return res.status(200).json({ "username": user.username, "firstName": user.firstName, "lastName": user.lastName, email: user.email });
                });
            }
        }
    });

    
};