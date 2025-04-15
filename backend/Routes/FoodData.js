const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

router.get('/foodData', async (req, res) => {
  try {
    const data = await FoodItem.find({});
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
