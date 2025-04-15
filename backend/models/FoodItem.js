const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  category: String,
  img: String
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
