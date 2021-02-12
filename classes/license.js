class License {
  constructor(number) {
    this.number = number;
  }

  isValid() {
    const licenseRegex = /^[A-Za-z]{3}[0-9]{3,4}$/;
    return licenseRegex.test(this.number);
  }

  lastDigit() {
    return parseInt(this.number.slice(-1));
  }
}

module.exports = License;
