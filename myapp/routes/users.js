var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login')
});

router.get('/register', function(req,res,next){
  res.render('register')
})

router.post('/register',function(req,res,next){
  res.json('burası users/register post methodu')
})

module.exports = router;
