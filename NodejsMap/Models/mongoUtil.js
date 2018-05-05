var MongoClient = require('mongodb').MongoClient;

var _db;

module.exports = {

    connectToServer: function (callback) {
        MongoClient.connect("mongodb://dbuser:A11a21a31@ds012188.mlab.com:12188/realestate-map", function (err, database) {

        if (err) throw err;

        _db = database.db('realestate-map');
        return callback(err);

         });
    },    

    getDb: function () {
        return _db;
    }


};