var cardinalOrdinalNumberService = {
  positions: [0, 1000, 1000000, 1000000000],
  convertNumberToText: function convertNumberToText(number) {
    var threeNumber = 3;
    var numberText = number.toString();
    var lengthOfNumber = numberText.length;
    var partial = lengthOfNumber / threeNumber;
    if (partial > 1) {
      var remainder = lengthOfNumber % threeNumber;
      if (remainder == 0) {
        remainder = threeNumber;
      }
      var results = "";
      var positionEndOfPartBefore = 0;
      var partialRound = Math.ceil(partial);
      for (i = 0; i < partialRound; i++) {
        var startIndex = positionEndOfPartBefore;
        var endIndex = threeNumber * i + remainder;
        var threeDigits = parseInt(numberText.substring(startIndex, endIndex));

        positionEndOfPartBefore = endIndex;
        var threeDigitsText =
          cardinalOrdinalNumberService.convertThreeDigitsLastToText(threeDigits);
        if (threeDigitsText != "") {
          results += threeDigitsText.trim() + " ";
          if (partialRound - (1 + i) > -1) {
            results += cardinalOrdinalNumberRepository.getCardinalTextByNumber(cardinalOrdinalNumberService.positions[partialRound - (1 + i)]) + " ";
          }
        }
      }
      results = results.trim();
    } else {
      results = cardinalOrdinalNumberService.convertThreeDigitsLastToText(number);
    }
    return results;
  },
  convertThreeDigitsLastToText: function convertThreeDigitsLastToText(number) {
    if (number <= 20) {
      return cardinalOrdinalNumberRepository.getCardinalTextByNumber(number);
    } else {
      var numberText = number.toString();
      var lengthOfNumber = numberText.length;
      var result = "";
      for (var j = 0; j < lengthOfNumber; j++) {
        var twoDigitsLast = parseInt(numberText.substring(lengthOfNumber - 2));
        if (twoDigitsLast <= 20 && lengthOfNumber - j <= 2) {
          result += cardinalOrdinalNumberRepository.getCardinalTextByNumber(twoDigitsLast);
          return result;
        } else {
          var firstDigit = parseInt(numberText.charAt(j));
          var numberProcessValue = firstDigit;

          if (lengthOfNumber - j > 2) {
            if (parseInt(firstDigit) != 0) {
              result += cardinalOrdinalNumberRepository.getCardinalTextByNumber(firstDigit) + " ";
              numberProcessValue = 1;
            }
          }
          numberProcessValue = numberProcessValue * Math.pow(10, lengthOfNumber - (j + 1));
          if (numberProcessValue != 0) {
            result += cardinalOrdinalNumberRepository.getCardinalTextByNumber(numberProcessValue) + " ";
          }
        }
      }
      return result.trim();
    }
  },
  convertOrdinalNumberToText: function convertOrdinalNumberToText(number) {
    var results = "";
    var twoCharacterLast = number;
    if (number > 20) {
      twoCharacterLast = parseInt(number.toString().substring(number.toString().length - 2, number.toString().length));
      number = number - twoCharacterLast;
      results = cardinalOrdinalNumberService.convertNumberToText(number).trim();
    }
    results += cardinalOrdinalNumberRepository.formatOrdinalText(twoCharacterLast);
    return results;
  }
};