var numberService = {
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
        var threeDigitsText = numberService.convertThreeDigitsToText(threeDigits);
        if (threeDigitsText != "") {
          results += threeDigitsText.trim() + " ";
          if (partialRound - (1 + i) > -1) {
            results += numberRepository.getCardinalTextByNumber(numberService.positions[partialRound - (1 + i)]) + " ";
          }
        }
      }
      results = results.trim();
    } else {
      results = numberService.convertThreeDigitsToText(number);
    }
    return results;
  },

  convertThreeDigitsToText: function convertThreeDigitsToText(number) {
    var results = "";
    if (number >= 100) {
      var hundredsUnit = Math.floor(number / 100); // ==> 398 / 100 = Math.floor(3.98) => 3
      results = numberRepository.getCardinalTextByNumber(hundredsUnit) + " ";
      results += numberRepository.getCardinalTextByNumber(100) + " ";
      number = number - (hundredsUnit * 100) // ==> 398 - (3 * 100) = 98;
    }
    if (number <= 20) {
      results += numberRepository.getCardinalTextByNumber(number);
    } else {
      var units = number % 10; // ==> 98 % 10 = 8
      var dozens = (number - units); // ==> (98 - 8) => 90
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

  convertThreeDigitToOrdinalText: function convertThreeDigitToOrdinalText(number) {
    var results = "";
    var twoCharacterLast = number;
    if (number > 20) {
      twoCharacterLast = parseInt(number.toString().substring(number.toString().length - 2, number.toString().length));
      number = number - twoCharacterLast;
      results = numberService.convertNumberToText(number).trim();
    }
    results += numberRepository.formatOrdinalText(twoCharacterLast);
    return results;
  },

  /* #region  Convert From "Thursday, June 3rd, 1999" To "Thursday, June the Third, One Thousand Nine Hundred Ninety Nine" */
  convertDateToFullDateForRead: function convertDateToFullDateForRead(dateValue) {
    var dateReadValid = dateValue.format('dddd, MMMM');
    dateReadValid += ' the' + numberService.convertThreeDigitToOrdinalText(dateValue.date());
    dateReadValid += ", " + numberService.convertNumberToText(dateValue.year());
    return dateReadValid.trim();
  },
  /* #endregion */

  /* #region  Convert Time To Telling Time Am Pm */
  convertTimeToTellingTimeAmPm: function convertTimeToTellingTimeAmPm(hours, minutes) {
    /* #region  Hours */
    var hoursText = "";
    var sessionText = "";
    if (0 <= hours && hours <= 11) {
      if (hours === 0) {
        hoursText = numberService.convertThreeDigitsToText(12);
      }
      else {
        hoursText = numberService.convertThreeDigitsToText(hours);
      }
      sessionText = " AM";
    }
    else {
      if (hours > 12) {
        hours -= 12;
      }
      hoursText = numberService.convertThreeDigitsToText(hours);
      sessionText = " PM";
    }
    if (minutes === 0) {
      hoursText += " O'clock";
    }
    /* #endregion */

    /* #region  Minutes */
    var minutesText = "";
    if (minutes < 10) {
      minutesText = " Oh ";
    }
    minutesText += numberService.convertThreeDigitsToText(minutes);
    minutesText = (minutesText.length > 0) ? " " + minutesText : minutesText;
    /* #endregion */
    return "It's " + hoursText + minutesText + sessionText;
  },
  /* #endregion */

  /* #region  Convert Time To Telling Time Simple */
  convertTimeToTellingTimeSimple: function convertTimeToTellingTimeSimple(hours, minutes) {
    /* #region  Hours */
    var hoursText = "";
    var sessionText = "";
    if (hours === 0) {
      if (minutes === 0) {
        hoursText = ' Midnight';
      }
      else {
        hoursText = numberService.convertThreeDigitsToText(12);
        sessionText = " In The Morning";
      }
    } else if (hours === 12 && minutes === 0) {
      if (minutes === 0) {
        hoursText = ' Noon';
      }
      else {
        hoursText = numberService.convertThreeDigitsToText(12);
        sessionText = " In The Afternoon";
      }
    } else {
      if (1 <= hours && hours <= 11) {
        sessionText = " In The Morning";
      }
      else if (12 <= hours && hours <= 17) {
        sessionText = " In The Afternoon";
      }
      else if (18 <= hours && hours <= 20) {
        sessionText = " In The Evening";
      } else if (20 <= hours || hours <= 5) {
        sessionText = " At Night";
      }
      if (hours > 12) {
        hours -= 12;
      }
      hoursText = numberService.convertThreeDigitsToText(hours);
      if (minutes === 0) {
        hoursText += " O'clock";
      }
    }
    /* #endregion */

    /* #region  Minutes */
    var minutesText = "";
    if (0 < minutes && minutes < 60) {
      if (minutes < 10) {
        minutesText = " Oh ";
      }
      minutesText += numberService.convertThreeDigitsToText(minutes);
    }
    minutesText = (minutesText.length > 0) ? " " + minutesText : minutesText;
    /* #endregion */
    return "It's " + hoursText + minutesText + sessionText;
  },
  /* #endregion */

  /* #region  Convert Time To Telling Time For Write */
  convertTimeToTellingTimeForWrite: function convertTimeToTellingTimeForWrite(hours, minutes) {
    /* #region  Minutes */
    var minutesText = "";
    if (0 < minutes && minutes < 30) {
      if (minutes === 15) {
        minutesText = "Quarter";
      }
      else {
        minutesText = numberService.convertThreeDigitsToText(minutes);
      }
      minutesText += " Past";
    }
    else if (minutes === 30) {
      minutesText = " Half Past"
    }
    else {
      minutes = 60 - minutes;
      if (minutes === 15) {
        minutesText = "Quarter";
      }
      else {
        minutesText = numberService.convertThreeDigitsToText(minutes);
      }
      minutesText += " To"
      hours++;
    }
    minutesText = (minutesText.length > 0) ? minutesText + " " : minutesText;
    /* #endregion */

    /* #region  Hours */
    var hoursText = "";
    var sessionText = "";
    if (hours === 0) {
      sessionText = ' Midnight';
    } else if (hours === 12 && minutes === 0) {
      sessionText = ' Noon';
    } else {
      var amPM = (hours > 12) ? hours - 12 : hours;
      hoursText = numberService.convertThreeDigitsToText(amPM);
      if (1 <= hours && hours <= 11) {
        sessionText = " In The Morning";
      }
      else if (12 <= hours && hours <= 17) {
        sessionText = " In The Afternoon";
      }
      else if (18 <= hours && hours <= 20) {
        sessionText = " In The Evening";
      } else if (21 < hours || hours <= 5) {
        sessionText = " At Night";
      }
    }
    /* #endregion */
    return "It's " + minutesText + hoursText + sessionText;
  }
  /* #endregion */
};