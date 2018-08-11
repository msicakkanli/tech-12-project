var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//navigation routes
router.get('/howto', function (req,res,next) {
  res.render('howto')
});

router.get('/schedule', function (req,res,next) {
  res.render('schedule')
})

module.exports = router;
