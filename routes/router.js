const express = require("express");
const router = new express.Router();

const controller = require("../controllers/controller.js");

router.get("/", async (_, res) => {
  res.json({
    success: true,
    message: "Dynamic Pricing Algorithm HEALTH OK :)",
  });
});

router.post("/get-price", controller.getPrice);

module.exports = router;
