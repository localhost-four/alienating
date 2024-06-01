


var express = require('express');
var router = express.Router();

/* GET home page. redirecting back to the main page if they don't type anything */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'CMS' });
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

module.exports = router;


