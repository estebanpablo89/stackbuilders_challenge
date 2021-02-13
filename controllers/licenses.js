const License = require('../classes/license');
const DateManager = require('../classes/dateManager');

exports.getResult = (req, res) => {
  //data into array
  const data = req.body.data.split(' ');

  //create license
  const license = new License(data[0]);

  //create date
  const dateManager = new DateManager(data[1], data[2]);

  const errorMessage =
    'error in data, input format should be ABC0000 31-01-2019 15:59';

  //return error if invalid license
  if (!license.isValid()) {
    return res.status(400).json({
      error: errorMessage,
    });
  }

  //return error if invalid date
  if (
    !dateManager.hourToGoOut.isValid() ||
    !dateManager.dayToGoOut.isValid()
  ) {
    return res.status(400).json({
      error: errorMessage,
    });
  }

  //get day
  const day = dateManager.dayToGoOut.day();

  //restriction days
  const restrictionMap = {
    0: [],
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7, 8],
    5: [9, 0],
  };

  let info = '';

  //logic if hour is in range and license is restricted
  if (
    dateManager.isHourInRange() &&
    restrictionMap[day].includes(license.lastDigit())
  ) {
    info = 'Not allowed to drive';
  } else {
    info = 'Allowed to drive';
  }

  //response
  res.status(200).json({
    success: true,
    data: {
      license: license.number,
      date: dateManager.dayToGoOut,
      info,
    },
  });
};
