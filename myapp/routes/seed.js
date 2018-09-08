'use strict';

const express = require('express');
const router = express.Router();
const Request = require('request');
const Result = require('../models/result');
const Goal = require('../models/goal')
const start = '2018-08-31'
const end = '2018-09-02'



// Request.get("https://apifootball.com/api/?action=get_events&from="+start+"&to="+end+"&league_id=376&APIkey=ae3a83c0aaddac6fbfe8459ea2966e07264e6e7c00f581df7e837da355c49fd9", (error, res, body) => {
//     if(error) {
//         return console.dir(error);
//     }
    
//     let resultData = JSON.parse(body);
//     for (var key in resultData){
//         let keyevent = resultData[key]
//        let eventVeri = {
//         numberOfWeek: 4,   
//         match_id: keyevent.match_id,
//         country_id: keyevent.country_id,
//          country_name: keyevent.country_name,
//         league_id: keyevent.league_id,
//         league_name: keyevent.league_name,
//         match_date: keyevent.match_date,
//         match_status: keyevent.match_status,
//         match_time: keyevent.match_time,
//         match_hometeam_name: keyevent.match_hometeam_name,
//         match_hometeam_score: keyevent.match_hometeam_score,
//         match_awayteam_name: keyevent.match_awayteam_name,
//         match_awayteam_score: keyevent.match_awayteam_score,
//         match_hometeam_halftime_score: keyevent.match_hometeam_halftime_score,
//         match_awayteam_halftime_score: keyevent.match_awayteam_halftime_score,
//         match_hometeam_extra_score: keyevent.match_hometeam_extra_score,
//         match_awayteam_extra_score: keyevent.match_awayteam_extra_score,
//         match_hometeam_penalty_score: keyevent.match_hometeam_penalty_score,
//         match_awayteam_penalty_score: keyevent.match_awayteam_penalty_score,
//         match_hometeam_system: keyevent.match_hometeam_system,
//         match_awayteam_system: keyevent.match_awayteam_system,
//         match_live: keyevent.match_live,
//         goalscorer : keyevent.goalscorer
//        }
//        console.log(keyevent.match_hometeam_name )
//        var result = new Result(eventVeri);
//        result.save(function(err,match){
//            if(err) return console.log(err);

//        })
//     }
// });




module.exports = router;
 