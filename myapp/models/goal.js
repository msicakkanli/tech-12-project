const mongoose = require('mongoose');

var goalSchema = new mongoose.Schema({
    match_id:{
        type: Number,
        unique: true
    },
    goalscorer : [
        {
            time: {type: String},
            home_scorer :{type: String},
            score: {type: String},
            away_scorer: {type:String}
        }
    ]
})

 var Goal = mongoose.model('Goal', goalSchema);
 module.exports = Goal;



