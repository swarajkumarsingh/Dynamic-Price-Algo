const utils = require("../utils/utils.js");
const Price = require("../db/models/Price.js");

module.exports.getPrice = async (req, res) => {
  try {
    let name = req.body.name;
    let demand = req.body.demand;
    let supply = req.body.supply;
    let base_price = req.body.base_price;
    let time_of_day = req.body.time_of_day;
    let location = req.body.location;

    if (!time_of_day || time_of_day === null || time_of_day === "") {
      var today = new Date();
      var curHr = today.getHours();

      time_of_day = utils.getTimeInString(curHr);
    }

    const priceNumber = utils.getPrice(
      demand,
      supply,
      base_price,
      time_of_day,
      location
    );


    const price = await Price.create({
      UserName: name,
      Location: location,
      Time: Date.now(),
      TimeOfDay: time_of_day,
      Price: priceNumber,
    });

    if (!price || !"UserName" in price) {
      return res.status(500).json({
        error: true,
        message: "Error while saving info in DataBase",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Dynamic Price fetched successfully",
      data: price.toObject(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Unknown error occurred",
      errorMessage: error,
    });
  }
};
