const express = require('express');
const router = express.Router();

const foodData = require('../data/foodData.json');
const foodCategory = require('../data/foodCategory.json');

router.post('/foodData', (req, res) => {
    try {
        res.send([foodData, foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
});

module.exports = router;
