const mongoose = require('mongoose');

const cropDiseaseSchema = new mongoose.Schema({
  crop: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  diseaseType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  // Autres champs pertinents pour les maladies et parasites des cultures
});

const CropDisease = mongoose.model('CropDisease', cropDiseaseSchema);

module.exports = CropDisease;
