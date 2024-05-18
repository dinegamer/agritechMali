const mongoose = require('mongoose');

const soilAnalysisSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  pHLevel: {
    type: Number,
    required: true,
  },
  moistureLevel: {
    type: Number,
    required: true,
  },
  nutrientLevels: {
    // Exemple de champ pour les niveaux de nutriments
    nitrogen: {
      type: Number,
      required: true,
    },
    phosphorus: {
      type: Number,
      required: true,
    },
    potassium: {
      type: Number,
      required: true,
    },
    // Ajoute d'autres nutriments si nécessaire
  },
  // Ajoute d'autres champs pertinents pour l'analyse du sol
});

const SoilAnalysis = mongoose.model('SoilAnalysis', soilAnalysisSchema);

module.exports = SoilAnalysis;
