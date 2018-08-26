const mongoose = require('mongoose');


var weatherSchema = new mongoose.Schema({
    weather:[{ 
        wheatherId :{ type: Number },
        mail:{ type: String},
        description:{ type: String},
        icon: {type: String}
    }],
    main: {
        temp: {type: Number},
        presure: {type: Number},
        humidity: {type: Number},
        temp_min: {type: Number},
        temp_max:{type: Number}
    },
    id: {type: Number},
    name:{type: String},

})

 var Weather = mongoose.model('Weather', weatherSchema);
 module.exports = Weather;