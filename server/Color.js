const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
	color: String,
	number: Number
});



module.exports = mongoose.model('Color', ColorSchema);