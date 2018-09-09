const mongoose = require('mongoose');


var fixtureSchema = new mongoose.Schema({
    numberOfWeek: { type: Number },
    start: { type: Date },
    end: { type: Date }

})

var Fixture = mongoose.model('Fixture', fixtureSchema);
module.exports = Fixture;