//var realEstate = require('../models/RealEstateModel');
var mongoUtil = require('../Models/mongoUtil');
var db = mongoUtil.getDb();
var ObjectId = require('mongodb').ObjectID;


// list 
exports.article_list = function (req, res) {
    db.collection('articles').find({}).toArray(function (err, result) {
        if (err) throw err;
        return res.json(result);
    });
};

// details
exports.article_detail = function (req, res) {
    db.collection('articles').find({ _id: ObjectId(req.params.id) }).toArray(function (err, result) {
        if (err) throw err;
        return res.json(result);
    });
};


// POST create
exports.article_create_post = function (req, res) {
    db.collection('articles').insert({ title: req.body.title, subtitle: req.body.subtitle, content: req.body.content }, (err, result) => {
        if (err) return console.log(err);
        return res.json({ 'success': true, 'message': 'Article added successfully', article: result.ops[0] });
    });

};

// POST update
exports.article_update_post = function (req, res) {
    db.collection('articles').updateOne({ _id: ObjectId(req.body._id) }, { $set: { title: req.body.title, subtitle: req.body.subtitle, content: req.body.content } }, function (err, result) {
        if (err) return console.log(err);
        return res.json({ 'success': true, 'message': 'Article updated successfully', article: req.body });
    });

};

// POST delete
exports.article_delete_post = function (req, res) {
    db.collection('articles').deleteOne({ _id: ObjectId(req.body._id) }, function (err, result) {
        if (err) return console.log(err);
        return res.json({ 'success': true, 'message': 'Articl removed successfully', article: req.body });
    });
};


