const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://harlinmartin2022:Harlin1234martin%40@cluster0.4xrvsxg.mongodb.net/Customer?retryWrites=true&w=majority';

module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
    if (err) {
      console.log("---" + err);
    } else {
      console.log("✅ Connected to MongoDB");
      try {
        const foodCollection = await mongoose.connection.db.collection("food_items");
        const data = await foodCollection.find({}).toArray();

        const categoryCollection = await mongoose.connection.db.collection("Categories");
        const Catdata = await categoryCollection.find({}).toArray();

        callback(null, data, Catdata);
      } catch (fetchErr) {
        console.log("❌ Error fetching collections:", fetchErr);
        callback(fetchErr, null, null);
      }
    }
  });
};
