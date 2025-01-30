const numberService = {
  positions: [0, 1000, 1000000, 1000000000],
  convertNumberToText(number) {
    let threeNumber = 3;
    let numberText = number.toString(); // ==> 71,698,401
    let lengthOfNumber = numberText.length; // ==> 9
    let partial = lengthOfNumber / threeNumber; // ==> (8 / 3) = 2.6
    if (partial > 1) {
      let remainder = lengthOfNumber % threeNumber; // ==> (8 % 3) = 2 => Update remainder = 2
      if (remainder == 0) { // ==> remainder === 0 => Update remainder = 3
        remainder = threeNumber; // ==> 3
      }
      let results = "";
      let positionEndOfPartBefore = 0;
      let partialRound = Math.ceil(partial); // ==> Math.ceil(2.6) => Update partialRound = 2
      for (i = 0; i < partialRound; i++) {
        let startIndex = positionEndOfPartBefore;
        let endIndex = threeNumber * i + remainder;
        let threeDigits = parseInt(numberText.substring(startIndex, endIndex));

        positionEndOfPartBefore = endIndex;
        let threeDigitsText = numberService.convertThreeDigitsToText(threeDigits);
        if (threeDigitsText != "") {
          results += threeDigitsText.trim() + " ";
          if (partialRound - (1 + i) > -1) {
            results += numberRepository.getCardinalTextByNumber(numberService.positions[partialRound - (1 + i)]) + " ";
          }
        }
      }
      results = results.trim();
      return results
    } else {
      return results = numberService.convertThreeDigitsToText(number);
    }
  },

  convertThreeDigitsToText(number) {
    let results = "";
    if (number >= 100) {
      let hundredsUnit = Math.floor(number / 100); // ==> 398 / 100 = Math.floor(3.98) => 3
      results = numberRepository.getCardinalTextByNumber(hundredsUnit) + " ";
      results += numberRepository.getCardinalTextByNumber(100) + " ";
      number = number - (hundredsUnit * 100) // ==> 398 - (3 * 100) = 98;
    }
    if (number <= 20) {
      results += numberRepository.getCardinalTextByNumber(number);
    } else {
      let units = number % 10; // ==> 98 % 10 = 8
      let dozens = (number - units); // ==> (98 - 8) => 90
      if (dozens > 0) {
        results += numberRepository.getCardinalTextByNumber(dozens);
        if (units > 0) {
          results += "-";
        }
      }
      if (units > 0) {
        results += numberRepository.getCardinalTextByNumber(units);
      }
    }
    return results.trim();
  },

  convertDigitsToOrdinalText(number) {
    let results = "";
    let twoDigitLast = number;
    if (number > 20) {
      twoDigitLast = parseInt(number.toString().substring(number.toString().length - 2, number.toString().length));
      number = number - twoDigitLast;
      results = numberService.convertNumberToText(number).trimStart().trimEnd();
      console.log('results: ', results);
      let twoCharacterLast = numberRepository.formatOrdinalText(twoDigitLast);
      console.log('twoCharacterLast: ', twoCharacterLast);
      if (twoCharacterLast.length > 0) {
        results += twoCharacterLast;
      }
    }
    else {
      results = numberRepository.formatOrdinalText(twoDigitLast);
    }
    return results.trimStart().trimEnd();
  },
  /* #region  Convert From "Thursday, June 3rd, 1999" To "Thursday, June the Third, One Thousand Nine Hundred Ninety Nine" */
  convertDateToFullDateForRead(dateValue) {
    let dateReadValid = dateValue.format('dddd, MMMM');
    dateReadValid += ' the ' + numberService.convertDigitsToOrdinalText(dateValue.date());
    dateReadValid += ", " + numberService.convertNumberToText(dateValue.year());
    return dateReadValid.trim();
  },
  /* #endregion */
};