const moment = require('moment');

class DateManager {
  constructor(dayToGoOut, hourToGoOut) {
    this.dayToGoOut = moment(dayToGoOut, 'DD-MM-YYYY', true);
    this.hourToGoOut = moment(hourToGoOut, 'kk:mm', true);

    //restriction morning hour
    this.morningRestrictionBegin = moment('06:59', 'kk:mm');
    this.morningRestrictionEnd = moment('09:31', 'kk:mm');

    //restriction afternoon hour
    this.afternoonRestrictionBegin = moment('15:59', 'kk:mm');
    this.afternoonRestrictionEnd = moment('19:31', 'kk:mm');
  }

  isHourInRange() {
    if (
      this.hourToGoOut.isBetween(
        this.morningRestrictionBegin,
        this.morningRestrictionEnd
      ) ||
      this.hourToGoOut.isBetween(
        this.afternoonRestrictionBegin,
        this.afternoonRestrictionEnd
      )
    ) {
      return true;
    }
    return false;
  }
}

module.exports = DateManager;
