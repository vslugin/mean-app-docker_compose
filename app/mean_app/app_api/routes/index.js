var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');

var auth = jwt({
   secret: 'thisIsSecret',
   _userProperty: 'payload'
});

var ctrlNews = require('../controllers/news');
var ctrlAuth = require('../controllers/authentication');

router.get('/news', auth, ctrlNews.list);
router.get('/news/:id', auth, ctrlNews.find);
router.post('/news', auth, ctrlNews.create);
router.put('/news/:id', auth, ctrlNews.update);
router.delete('/news/:id', auth, ctrlNews.delete);

/*router.get('/news', ctrlNews.list);
router.get('/news/:id', ctrlNews.find);
router.post('/news', ctrlNews.create);
router.put('/news/:id', ctrlNews.update);
router.delete('/news/:id', ctrlNews.delete);*/

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;