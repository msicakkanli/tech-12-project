const mongoose = require('mongoose');
const League = require('./league');
const City = require('./city')


var teamSchema = new mongoose.Schema({
    country_name: {
        type: String
    },
    league:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League'
    }],
    team_name: {
        type: String,
    },
    city:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'City'
    }]

})

 var Team = mongoose.model('Team', teamSchema);
 module.exports = Team;