var express = require('express');
var router = express.Router();
const League = require('../models/league')
const mid = require('../middleware')
const Team = require('../models/team');
const City = require('../models/city');
const axios = require('axios');
const moment = require('moment');

//calculate start and end of week days
let day = moment().day()
let dayDiffStart = 5 - day
let dayDiffEnd = 8 - day
if (day === 0 ) {
        let  dayDiffStart = -2
        let   dayDiffEnd = 1 
        weekOfStart = moment().add(dayDiffStart,'d').format('YYYY-MM-DD')
        weekOfEnd = moment().add(dayDiffEnd,'d').format('YYYY-MM-DD')
} else if (day === 1) {
        let  dayDiffStart = -3
        let   dayDiffEnd = 0
        weekOfStart = moment().add(dayDiffStart,'d').format('YYYY-MM-DD')
        weekOfEnd = moment().add(dayDiffEnd,'d').format('YYYY-MM-DD')
} else {
        weekOfStart = moment().add(dayDiffStart,'d').format('YYYY-MM-DD')
        weekOfEnd = moment().add(dayDiffEnd,'d').format('YYYY-MM-DD')
    }
let leagueValue = 376
let footballApi ='https://apifootball.com/api/?action=get_events&from='+weekOfStart+'&to='+weekOfEnd+'&league_id='+leagueValue+'&APIkey=646fd20b9e01e1179ada2415371db638f460a3fcfaa4e17d6cc9ff5ac5b454f2'
let leagueApi='http://localhost:3000/api/leagueData'
let standingApi ='https://apifootball.com/api/?action=get_standings&league_id=376&APIkey=646fd20b9e01e1179ada2415371db638f460a3fcfaa4e17d6cc9ff5ac5b454f2'
/* GET home page. */
router.get('/', function(req, res, next) {
  function getLeague() {
    return axios.get(leagueApi) 
  }
  function getMatch() {
    return axios.get(footballApi)
  }
axios.all([getLeague(), getMatch()])
.then(axios.spread(function (league, match) {
      let matchs = match.data
      let leagues = league.data
      res.render('index', {matchs:matchs, leagues:leagues})
}))
});

//Get match detail page
router.get('/match_detail/:id', function (req,res,next) {
  let match = []
  Team.findOne({team_name:req.params.id})
  .populate('city league')
    .exec(function (error, teamDetail) {
      if(error) {
        return next(error)
      } else {
          let teamCityId = teamDetail.city[0].cityId
          let forecastApi = 'http://api.openweathermap.org/data/2.5/forecast/daily?id='+teamCityId+'&cnt=7&units=metric&APPID=31573ef1a574d3c2f1150c5d3ef9d2e5'
          function getForecast() {
            return axios.get(forecastApi) 
          }
          function getFixture() {
            return axios.get(footballApi)
          }
            axios.all([getForecast(), getFixture()])
              .then(axios.spread(function (forecast, fixture) {
                let weather = forecast.data
                let matchs = fixture.data
                matchs.forEach(function (item) {
                  if (item.match_hometeam_name === req.params.id){                    
                    match.push(item)
                    return match
                  }
                })
                var myDate = new Date(match[0].match_date);
                var today = moment().format('YYYY-MM-DD');
                var myToday = new Date(today)
                var diff = (myDate - myToday)/86400000
                if (diff <= 0) {
                  diff = 0
                } 
                var dailyForecast = weather.list[diff]
                res.render('detail', {dailyForecast:dailyForecast, match:match}) 
                 
               
            })); 
      }
    })
})

//navigation routes
router.get('/standings', function (req,res,next) {
  axios.get(standingApi)
    .then((response) => {

      let  stand = response.data
        console.log(stand)
       // res.json(stand)
        res.render('standings', {stand: stand})

    })
});

router.post('/', function (req,res,next) {
  leagueValue = req.body.selectleague
  footballApi ='https://apifootball.com/api/?action=get_events&from='+weekOfStart+'&to='+weekOfEnd+'&league_id='+leagueValue+'&APIkey=646fd20b9e01e1179ada2415371db638f460a3fcfaa4e17d6cc9ff5ac5b454f2'
  function getLeague() {
    return axios.get(leagueApi) 
  }
  function getMatch() {
    return axios.get(footballApi)
  }
axios.all([getLeague(), getMatch()])
.then(axios.spread(function (league, match) {
      let matchs = match.data
      let leagues = league.data
      res.render('index', {matchs:matchs, leagues:leagues})
}))
})
router.get('/schedule', function (req,res,next) {
  res.render('schedule')
})




module.exports = router;
