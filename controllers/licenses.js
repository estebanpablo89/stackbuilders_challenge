const License = require('../classes/license');
const DateManager = require('../classes/dateManager');

exports.getResult = (req, res) => {
  //data into array
  const data = req.body.data.split(' ');

  //separate info

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

  let info = '';
  const successMsg = 'Allowed to drive';
  const failMsg = 'Not allowed to drive';

  if (dateManager.isHourInRange()) {
    if (day == 0) {
      info = successMsg;
    } else if (
      day == 1 &&
      [1, 2].includes(license.lastDigit())
    ) {
      info = failMsg;
    } else if (
      day == 2 &&
      [3, 4].includes(license.lastDigit())
    ) {
      info = failMsg;
    } else if (
      day == 3 &&
      [5, 6].includes(license.lastDigit())
    ) {
      info = failMsg;
    } else if (
      day == 4 &&
      [7, 8].includes(license.lastDigit())
    ) {
      info = failMsg;
    } else if (
      day == 5 &&
      [9, 0].includes(license.lastDigit())
    ) {
      info = failMsg;
    }
  } else {
    info = successMsg;
  }

  res.status(200).json({
    success: true,
    data: {
      license: license.number,
      date: dateManager.dayToGoOut,
      info,
    },
  });
};
