const License = require('../classes/license');
const DateManager = require('../classes/dateManager');

exports.getResult = (req, res) => {
  //data into array
  const dataArray = req.body.data.split(' ');

  //separate info

  //create license
  const license = new License(dataArray[0]);

  //create date
  const dateManager = new DateManager(
    dataArray[1],
    dataArray[2]
  );

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
      (license.lastDigit() == 1 || license.lastDigit() == 2)
    ) {
      info = failMsg;
    } else if (
      day == 2 &&
      (license.lastDigit() == 3 || license.lastDigit() == 4)
    ) {
      info = failMsg;
    } else if (
      day == 3 &&
      (license.lastDigit() == 5 || license.lastDigit() == 6)
    ) {
      info = failMsg;
    } else if (
      day == 4 &&
      (license.lastDigit() == 7 || license.lastDigit() == 8)
    ) {
      info = failMsg;
    } else if (
      day == 5 &&
      (license.lastDigit() == 9 || license.lastDigit() == 0)
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
