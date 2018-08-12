var express = require('express');
var router = express.Router();
const League = require('../models/league')

/* GET home page. */
router.get('/', function(req, res, next) {
  League.find()
  .exec(function(error,leagues){
    if(error){
      return next(error);
    } else {
      res.render('index', { leagues: leagues });
    }
  })
  
});

//navigation routes
router.get('/howto', function (req,res,next) {
  res.render('howto')
});

router.get('/schedule', function (req,res,next) {
  res.render('schedule')
})

router.get('/login', function (req,res,next) {
  res.render('login')
})

module.exports = router;
