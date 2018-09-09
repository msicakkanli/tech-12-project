var express = require('express');
var router = express.Router();
const League = require('../models/league')
const Team = require('../models/team');
const City = require('../models/city');
const axios = require('axios');
const moment = require('moment');
const Result = require('../models/result')
const config = require('../local/api')

//calculate start and end of week days
// let day = moment().day()
// let dayDiffStart = 5 - day
// let dayDiffEnd = 8 - day
// if (day === 0) {
//   let dayDiffStart = -2
//   let dayDiffEnd = 1
//   weekOfStart = moment().add(dayDiffStart, 'd').format('YYYY-MM-DD')
//   weekOfEnd = moment().add(dayDiffEnd, 'd').format('YYYY-MM-DD')
// } else if (day === 1) {
//   let dayDiffStart = -3
//   let dayDiffEnd = 0
//   weekOfStart = moment().add(dayDiffStart, 'd').format('YYYY-MM-DD')
//   weekOfEnd = moment().add(dayDiffEnd, 'd').format('YYYY-MM-DD')
// } else {
//   weekOfStart = moment().add(dayDiffStart, 'd').format('YYYY-MM-DD')
//   weekOfEnd = moment().add(dayDiffEnd, 'd').format('YYYY-MM-DD')
// }
let weekOfStart = '2018-09-14'
let weekOfEnd = '2018-09-17'

let leagueValue = 376
let footballApi ='https://apifootball.com/api/?action=get_events&from='+weekOfStart+'&to='+weekOfEnd+'&league_id='+leagueValue+'&APIkey='+config.footballApi
let leagueApi='http://localhost:3000/api/leagueData'
let standingApi ='https://apifootball.com/api/?action=get_standings&league_id=376&APIkey='+config.footballApi



/* GET home page. */
router.get('/', function (req, res, next) {
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
      let start = moment(weekOfStart).format('DD-MM')
      let end = moment(weekOfEnd).format('DD-MM')
      res.render('index', { matchs: matchs, leagues: leagues, start: start, end: end })
    }))
});

//change league data on index page
router.post('/', function (req, res, next) {
  leagueValue = req.body.selectleague
  footballApi = 'https://apifootball.com/api/?action=get_events&from=' + weekOfStart + '&to=' + weekOfEnd + '&league_id=' + leagueValue + '&APIkey='+config.footballApi
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
      let start = moment(weekOfStart).format('DD-MM')
      let end = moment(weekOfEnd).format('DD-MM')
      res.render('index', { matchs: matchs, leagues: leagues, start: start, end: end })
    }))
})

//Get match detail page
router.get('/match_detail/:id', function (req, res, next) {
  let match = []
  Team.findOne({ team_name: req.params.id })
    .populate('city league')
    .exec(function (error, teamDetail) {
      if (error) {
        return next(error)
      } else {
        let teamCityId = teamDetail.city[0].cityId
        let forecastApi = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + teamCityId + '&cnt=7&units=metric&APPID='+config.weatherApi
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
              if (item.match_hometeam_name === req.params.id) {
                match.push(item)
                return match
              }
            })
            var myDate = new Date(match[0].match_date);
            var today = moment().format('YYYY-MM-DD');
            var myToday = new Date(today)
            var diff = (myDate - myToday) / 86400000
            if (diff <= 0) {
              diff = 0
            }
            var dailyForecast = weather.list[diff]
            res.render('detail', { dailyForecast: dailyForecast, match: match })


          }));
      }
    })
})


//change league data on index page
router.get('/standings', function (req, res, next) {
  function getLeague() {
    return axios.get(leagueApi)
  }
  function getSchedule() {
    return axios.get(standingApi)
  }
  axios.all([getLeague(), getSchedule()])
    .then(axios.spread(function (league, standing) {
      let stand = standing.data
      let leagues = league.data
      
      stand.sort(function(a,b)  {return (parseInt(a.overall_league_position) > parseInt(b.overall_league_position) ? 1 : (parseInt(b.overall_league_position) > parseInt(a.overall_league_position)) ? -1 : 0);} );
      res.render('standings', {stand:stand, leagues:leagues})
     //res.json(stand)
    }))
});

router.post('/standing', function (req, res, next) {
  leagueValue = req.body.selectleague
  let standingApi = 'https://apifootball.com/api/?action=get_standings&league_id=' + leagueValue + '&APIkey='+config.footballApi
  function getLeague() {
    return axios.get(leagueApi)
  }
  function getSchedule() {
    return axios.get(standingApi)
  }
  axios.all([getLeague(), getSchedule()])
    .then(axios.spread(function (league, standing) {
      let stand = standing.data
      let leagues = league.data
      stand.sort(function(a,b) {return (parseInt(a.overall_league_position) > parseInt(b.overall_league_position) ? 1 : (parseInt(b.overall_league_position) > parseInt(a.overall_league_position)) ? -1 : 0);} )
      res.render('standings', { stand: stand, leagues: leagues })
    }))
})

let week = 4
router.get('/previous', function (req, res, next) {
  Result.find({ numberOfWeek: week })
    .exec(function (error, matchs) {
      if (error) {
        return next(error)
      } else {
        res.render('previous', { matchs: matchs })
        //res.json(matchs)
      }
    })
})

router.get('/previous/:id', function (req, res, next) {
  Result.find({ numberOfWeek: req.params.id })
    .exec(function (error, matchs) {
      if (error) {
        return next(error)
      } else {
        res.render('previous', { matchs: matchs })
        //res.json(matchs)
      }
    })
})




module.exports = router;
