var MongoClient = require('mongodb').MongoClient;

var _db;

module.exports = {

    connectToServer: function (callback) {
        MongoClient.connect("mongodb://", function (err, database) {

        if (err) throw err;

        _db = database.db('realestate-map');
        return callback(err);

         });
    },    

    getDb: function () {
        return _db;
    }


};
