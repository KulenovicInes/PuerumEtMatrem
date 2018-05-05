var express = require('express');
var router = express.Router();


// Require our controllers.
var article_controller = require('../controllers/articlesController');

/// ARTICLE ROUTES ///

// POST request for creating articles
router.post('/create', article_controller.article_create_post);

// POST request to delete articles
router.post('/delete', article_controller.article_delete_post);

// POST request to update articles
router.post('/update', article_controller.article_update_post);

// GET request for list of articles
router.get('/articles', article_controller.article_list);

// GET request for one article
router.get('/:id', article_controller.article_detail);



module.exports = router;