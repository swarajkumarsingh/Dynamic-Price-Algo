const constants = require("../constants/constants.js");

function checkArray(variable, array) {
  for (let index = 0; index < array.length + 1; index++) {
    if (index === array.length) {
      return false;
    } else if (array[index] === variable) {
      return true;
    }
  }
}

function getTimeInString(myDate) {
  if (myDate < 12) {
    return "morning";
  } else if (myDate >= 12 && myDate <= 17) {
    return "afternoon";
  } else if (myDate > 17 && myDate <= 24) {
    return "evening";
  } else {
    return "night";
  }
}

function getPrice(demand, supply, price, time_of_day, location) {
  if (
    demand > supply &&
    checkArray(time_of_day, constants.timeArrays) &&
    checkArray(location, constants.locations)
  ) {
    return (price *= 1.5);
  } else if (
    demand < supply &&
    checkArray(time_of_day, constants.timeArrays) &&
    checkArray(location, constants.locations)
  ) {
    return (price *= 1.3);
  } else if (demand > supply && checkArray(location, constants.locations)) {
    return (price *= 1.2);
  } else if (demand > supply && checkArray(time_of_day, constants.timeArrays)) {
    return (price *= 1.2);
  } else if (demand > supply) {
    return (price *= 1.1);
  }

  return (price *= 1.01);
}

module.exports = {
  checkArray,
  getPrice,
  getTimeInString,
};
