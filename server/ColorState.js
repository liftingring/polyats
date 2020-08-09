const mongoose = require('mongoose');




const colorStateSchema = new mongoose.Schema({

  colors: {
  	type:Map,
  	of: String
  }
});


module.exports = mongoose.model('ColorState', colorStateSchema);