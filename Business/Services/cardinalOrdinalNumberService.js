var cardinalOrdinalNumberService = {
    positions: [0, 1000, 1000000, 1000000000],
    convertNumberToText: function convertNumberToText(number, type) {
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
                var endIndex = (threeNumber * i) + remainder;
                var threeDigits = parseInt(numberText.substring(startIndex, endIndex));

                positionEndOfPartBefore = endIndex;
                var threeDigitsText = cardinalOrdinalNumberRepository.getTextByNumber(threeDigits, type);
                if (threeDigitsText != "") {
                    results += threeDigitsText.trim() + " ";
                    if (partialRound - (1 + i) > -1) {
                        results += cardinalOrdinalNumberRepository.getTextByNumber(cardinalOrdinalNumberService.positions[partialRound - (1 + i)], type) + " ";
                    }
                }
            }
            results = results.trim();
        } else {
            results = cardinalOrdinalNumberService.convertThreeDigitsLastToText(number, type);
        }
        if (results != '' && type === cardinalOrdinalNumberConstant.type.ordinal) {
            results = cardinalOrdinalNumberRepository.formatOrdinalText(number, results);
        }
        return results;
    },
    convertThreeDigitsLastToText: function convertThreeDigitsLastToText(number, type) {
        if (number <= 20) {
            return cardinalOrdinalNumberRepository.getTextByNumber(number, type);
        } else {
            var numberText = number.toString();
            var lengthOfNumber = numberText.length;
            var result = "";
            for (var j = 0; j < lengthOfNumber; j++) {
                var twoDigitsLast = parseInt(numberText.substring(lengthOfNumber - 2));
                if (twoDigitsLast <= 20 && (lengthOfNumber - j <= 2)) {
                    result += cardinalOrdinalNumberRepository.getTextByNumber(twoDigitsLast, type);
                    return result
                } else {
                    var firstChar = numberText.charAt(j);
                    var numberProcessText = firstChar;

                    if (lengthOfNumber - j > 2) {
                        if (parseInt(firstChar) / 1 != 0) {
                            result += cardinalOrdinalNumberRepository.getTextByNumber(parseInt(firstChar), type) + " ";
                            numberProcessText = "1";
                        }
                    }
                    for (var i = 0; i < lengthOfNumber - (j + 1); i++) {
                        numberProcessText += "0";
                    }
                    if (parseInt(numberProcessText) / 1 != 0) {
                        result += cardinalOrdinalNumberRepository.getTextByNumber(parseInt(numberProcessText), type) + " ";
                    }
                }
            }
            return result.trim();
        }
    }
    // ,checkOrdinalNumber: function checkOrdinalNumber() {
    //     console.log('checkOrdinalNumber running...');
    // },

    // checkAcronym: function checkAcronym() {
    //     console.log('checkAcronym running...');
    // }
};




