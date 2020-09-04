const mongoose = require('mongoose');
const colorStateSchema = require('./ColorState').schema;




const colorHistorySchema = new mongoose.Schema({
	history: [colorStateSchema]


}, {
  timestamps: true,
});
module.exports = mongoose.model('History', colorHistorySchema);