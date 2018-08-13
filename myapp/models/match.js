const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    match_id :{
        type: Number,
      //  required:[true, 'Country id is required']
    },
    country_id: {
        type: Number,
        //required:[true, 'Country name is required']
    },
    match_date: {
        type: Date,
       // required:[true, 'League id is required']
    },
    match_hometeam_name: {
        type: String,
       // required:[true, 'League name is required']
    },
    match_hometeam_score: {
        type: Number,
    },
    match_awayteam_name: {
        type: String,
       // required:[true, 'League name is required']
    },
    match_awayteam_score: {
        type: Number,
    }
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;

