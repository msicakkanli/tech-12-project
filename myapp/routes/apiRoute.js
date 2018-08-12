'use strict';

const express = require('express');
const router = express.Router();
const Request = require('request');
const League = require('../models/league');

// router.get('/', function(req,res,next){
//     res.send("Wellcome Football Wizzard's API");
// })

//Insert Country Seed Data
// Request.get("https://apifootball.com/api/?action=get_leagues&APIkey=646fd20b9e01e1179ada2415371db638f460a3fcfaa4e17d6cc9ff5ac5b454f2", (error, res, body) => {
//     if(error) {
//         return console.dir(error);
//     }
//     let leagueData = JSON.parse(body);
//     for (var key in leagueData){
//         let league = leagueData[key]
//        let leagueVeri = {
//            country_id : league.country_id,
//            countryName: league.country_name,
//            leagueId : league.league_id,
//            leagueName : league.league_name
//        }
//        console.log(leagueVeri)
//        League.create(leagueVeri,function (error,league) {
//             if(error) {
//                 console.log(error)
//             }
//        })
//     }
// });




module.exports = router;

