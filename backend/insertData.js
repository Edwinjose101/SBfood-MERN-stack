const mongoose = require('mongoose');
const foodData = require('./foodData');
const FoodItem = require('./models/FoodItem');

const mongoURI = 'mongodb+srv://harlinmartin2022:Harlin1234martin%40@cluster0.4xrvsxg.mongodb.net/Customer?retryWrites=true&w=majority'; // paste your Mongo URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  await FoodItem.deleteMany({}); // optional: clears old data
  await FoodItem.insertMany(foodData);
  console.log("✅ Food data inserted!");
  process.exit();
}).catch(err => console.log("❌ Error:", err));
