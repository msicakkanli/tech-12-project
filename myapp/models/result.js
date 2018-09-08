const mongoose = require('mongoose');

var resultSchema = new mongoose.Schema({
    numberOfWeek: {type:Number},
   match_id: { type: Number,
    
},
    country_id: { type: Number},
     country_name:{ 
         type: String
        },
    league_id: { type: Number},
    league_name: { type: String},
    match_date: { type: Date},
    match_status: { type: String},
    match_time: { type: String},
     match_hometeam_name: { 
         type: String ,
         sparse: true },
    match_hometeam_score: { type: Number},
    match_awayteam_name: { type: String, 
        sparse: true},
    match_awayteam_score:{ type: Number},
    match_hometeam_halftime_score: { type: Number},
    match_awayteam_halftime_score: { type: Number},
    match_hometeam_extra_score: { type: Number},
    match_awayteam_extra_score: { type: Number},
    match_hometeam_penalty_score: { type: Number},
    match_awayteam_penalty_score: { type: Number},
    match_hometeam_system: { type: String},
    match_awayteam_system: { type: String},
    match_live: { type: Number},
    goalscorer : [
        {
            time: {type: String},
            home_scorer :{type: String},
            score: {type: String},
            away_scorer: {type:String}

        }
    ]
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;