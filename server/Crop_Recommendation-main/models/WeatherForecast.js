const mongoose = require('mongoose');

const weatherForecastSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  precipitation: {
    type: Number,
    required: true,
  },
  windSpeed: {
    type: Number,
    required: true,
  },
  // Autres champs météo...
});

const WeatherForecast = mongoose.model('WeatherForecast', weatherForecastSchema);

module.exports = WeatherForecast;
