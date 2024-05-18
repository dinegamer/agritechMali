const mongoose = require('mongoose');

const wasteManagementSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  recyclingCenters: {
    type: [String],
    required: true,
  },
  // Autres champs pertinents pour la gestion des déchets agricoles et du recyclage
});

const WasteManagement = mongoose.model('WasteManagement', wasteManagementSchema);

module.exports = WasteManagement;
