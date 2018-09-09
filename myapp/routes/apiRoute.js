'use strict';

const express = require('express');
const router = express.Router();
const Request = require('request');
const League = require('../models/league');
const Team = require('../models/team');
const axios = require('axios');
const Fixture = require('../models/fixture');


 
router.get('/leagueData', function (req, res, next) {
    League.find()
        .exec(function (error, leagues) {
            if (error) {
                return next(error);
            } else {
                res.json(leagues)
            }
        })
})

router.get('/fixtureData', function (req, res, next) {
    Fixture.find()
        .exec(function (error, fixture) {
            if (error) {
                return next(error);
            } else {
                res.json(fixture)
            }
        })
})





module.exports = router; 