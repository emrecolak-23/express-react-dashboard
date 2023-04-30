const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const planetsSchema = Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

// Connects planetsSchema with the "planets" collection
module.exports = mongoose.model('Planet', planetsSchema);
