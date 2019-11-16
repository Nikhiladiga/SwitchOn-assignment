const express = require("express");
const router = express.Router();
const TimeSeries = require("../models/TimeSeries");

//GET ALL NUMBERS
router.get("/", async (req, res) => {
  try {
    const timeSeries = await TimeSeries.find();
    res.json(timeSeries);
  } catch (err) {
    res.json({ message: err });
  }
});

//INSERT A NUMBER
router.post("/insert", async (req, res) => {
  console.log("number ------->", req.body.number);
  const timeSeries = new TimeSeries({
    number: req.body.number
  });

  try {
    const savedTimeSeries = await timeSeries.save();
    res.json(savedTimeSeries);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
