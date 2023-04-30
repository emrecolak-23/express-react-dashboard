const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const planetsSchema = Schema({
  keplerName: {
    type: String,
    required: true,
  },
});
