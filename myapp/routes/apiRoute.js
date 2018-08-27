'use strict';

const express = require('express');
const router = express.Router();
const Request = require('request');
const League = require('../models/league');
const Team = require('../models/team');
const axios = require('axios');
const Weather = require('../models/weather');

 
router.get('/leagueData', function (req,res,next) {
    League.find()
        .exec(function(error,leagues){
            if(error){
                return next(error);
            }   else {
                  res.json(leagues)
                }
    })
})



module.exports = router; 