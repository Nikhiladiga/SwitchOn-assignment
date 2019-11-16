const mongoose = require("mongoose");

const TimeSeriesSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now()
  },
  number: {
    type: Number,
    default: Math.floor(Math.random() * 10)
  }
});

module.exports = mongoose.model("TimeSeries", TimeSeriesSchema);
