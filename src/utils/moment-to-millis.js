var moment = require("moment");

module.exports = function(timeInMoment) {
    return ((moment(timeInMoment).hour() * 3600) + (moment(timeInMoment).minute() * 60)) * 1000;
}