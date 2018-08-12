const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    countryId :{
        type: Number,
      //  required:[true, 'Country id is required']
    },
    countryName: {
        type: String,
        //required:[true, 'Country name is required']
    },
    leagueId: {
        type: Number,
       // required:[true, 'League id is required']
    },
    leagueName : {
        type: String,
       // required:[true, 'League name is required']
    }
});

const League = mongoose.model('League', leagueSchema);
module.exports = League;