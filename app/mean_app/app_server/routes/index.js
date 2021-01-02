var express = require('express');
var router = express.Router();

var ctrlAdmin = require('../controllers/admin');

/* GET home page. */
router.get('/', ctrlAdmin.spa);

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
});

router.get('/admin/news', ctrlAdmin.getNewsList);

router.post('/admin/news', ctrlAdmin.createNews);

router.get('/admin/news/add', function(req, res, next) {
    res.render('admin-news-add', { title: 'Добавление' });
});

router.get('/admin/news/:id/edit', function(req, res, next) {
    res.render('admin-news-edit', { title: 'Редактирование' });
});

router.get('/admin/news/:id/delete', function(req, res, next) {
    res.render('admin-news-delete', { title: 'Серьёзно удалить?' });
});

module.exports = router;
