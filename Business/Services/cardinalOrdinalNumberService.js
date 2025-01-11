var cardinalOrdinalNumberService = {
  positions: [0, 1000, 1000000, 1000000000],
  convertNumberToText: function convertNumberToText(number) {
    var threeNumber = 3;
    var numberText = number.toString(); // ==> 71,698,401
    var lengthOfNumber = numberText.length; // ==> 9
    var partial = lengthOfNumber / threeNumber; // ==> (8 / 3) = 2.6
    if (partial > 1) {
      var remainder = lengthOfNumber % threeNumber; // ==> (8 % 3) = 2 => Update remainder = 2
      if (remainder == 0) { // ==> remainder === 0 => Update remainder = 3
        remainder = threeNumber; // ==> 3
      }
      var results = "";
      var positionEndOfPartBefore = 0;
      var partialRound = Math.ceil(partial); // ==> Math.ceil(2.6) => Update partialRound = 2
      for (i = 0; i < partialRound; i++) {
        var startIndex = positionEndOfPartBefore;
        var endIndex = threeNumber * i + remainder;
        var threeDigits = parseInt(numberText.substring(startIndex, endIndex));

        positionEndOfPartBefore = endIndex;
        var threeDigitsText = cardinalOrdinalNumberService.convertThreeDigitsToText(threeDigits);
        if (threeDigitsText != "") {
          results += threeDigitsText.trim() + " ";
          if (partialRound - (1 + i) > -1) {
            results += cardinalOrdinalNumberRepository.getCardinalTextByNumber(cardinalOrdinalNumberService.positions[partialRound - (1 + i)]) + " ";
          }
        }
      }
      results = results.trim();
    } else {
      results = cardinalOrdinalNumberService.convertThreeDigitsToText(number);
    }
    return results;
  },
  convertThreeDigitsToText: function convertThreeDigitsToText(number) {
    var results = "";
    if (number >= 100) {
      var hundredsUnit = Math.floor(number / 100); // ==> 398 / 100 = Math.floor(3.98) => 3
      results = cardinalOrdinalNumberRepository.getCardinalTextByNumber(hundredsUnit) + " ";
      results += cardinalOrdinalNumberRepository.getCardinalTextByNumber(100) + " ";
      number = number - (hundredsUnit * 100) // ==> 398 - (3 * 100) = 98;
    }
    if (number <= 20) {
      results += cardinalOrdinalNumberRepository.getCardinalTextByNumber(number);
    } else {
      var units = number % 10; // ==> 98 % 10 = 8
      var dozens = (number - units); // ==> (98 - 8) => 90
      if (dozens > 0) {
        results += cardinalOrdinalNumberRepository.getCardinalTextByNumber(dozens);
        if (units > 0) {
          results += "-";
        }
      }
      if (units > 0) {
        results += cardinalOrdinalNumberRepository.getCardinalTextByNumber(units);
      }
    }
    return results.trim();
  },
  convertThreeDigitToOrdinalText: function convertThreeDigitToOrdinalText(number) {
    var results = "";
    var twoCharacterLast = number;
    if (number > 20) {
      twoCharacterLast = parseInt(number.toString().substring(number.toString().length - 2, number.toString().length));
      number = number - twoCharacterLast;
      results = cardinalOrdinalNumberService.convertNumberToText(number).trim();
    }
    results += cardinalOrdinalNumberRepository.formatOrdinalText(twoCharacterLast);
    return results;
  },
  /* #region  Convert From "Thursday, June 3rd, 1999" To "Thursday, June the Third, One Thousand Nine Hundred Ninety Nine" */
  convertDateToFullDateForRead: function convertDateToFullDateForRead(dateValue) {
    var dateReadValid = dateValue.format('dddd, MMMM');
    dateReadValid += ' the' + cardinalOrdinalNumberService.convertThreeDigitToOrdinalText(dateValue.date());
    dateReadValid += ", " + cardinalOrdinalNumberService.convertNumberToText(dateValue.year());
    return dateReadValid;
  }
  /* #endregion */
};