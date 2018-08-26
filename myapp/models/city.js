const mongoose = require('mongoose');


var citySchema = new mongoose.Schema({
    cityId: {
        type: Number,
        unique: [true, 'The id is already exist'],

    },
    name: {
        type: String,

    },
    counrty: {
        type: String,

    },
    coord: {
        lon: {
            type: Number
        },
        lat:{
            type: Number
        } 
    }
})

 var City = mongoose.model('City', citySchema);
 module.exports = City;