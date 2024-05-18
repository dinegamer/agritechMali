const mongoose = require('mongoose');

const cropRecommendationSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
  },
  recommendedSeason: {
    type: String,
    required: true,
  },
  recommendedPractices: {
    type: [String], // Exemple de pratiques recommandées
    required: true,
  },
  // Autres champs pertinents pour les recommandations de culture
});

const CropRecommendation = mongoose.model('CropRecommendation', cropRecommendationSchema);

module.exports = CropRecommendation;
