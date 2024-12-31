function bindingData() {
    var rows = getRows();
    var lengthOfRows = getLengthOfRows(rows);
    for (var i = 1; i < lengthOfRows; i++) {
        var row = rows.eq(i);

        var lbl = row.find('td.numberCol .lbl');
        lbl.html(formatNumber(randomNumber()));

        resetRow(row);
    }
}

function resetRow(row) {
    var txt = row.find('td.cardinalNumberCol .txt');
    txt.val('');

    var lblError = row.find('td.cardinalNumberCol .lblError');
    lblError.addClass('hide');
    lblError.html('');

    row.removeClass('rowSuccess');
    row.removeClass('rowError');
}

function checkCardinalNumber() {
    var rows = getRows();
    var lengthOfRows = getLengthOfRows(rows);
    for (var i = 1; i < lengthOfRows; i++) {
        var row = rows.eq(i);
        var lblNumber = row.find('td.numberCol .lbl');
        var td = row.find('td.cardinalNumberCol');
        var txt = td.find('.txt');

        var lblError = td.find('.lblError');
        lblError.addClass('hide');

        row.removeClass('rowSuccess');
        row.removeClass('rowError');

        if (txt.val().length > 0) {
            var cardinalText = convertNumberToCardinalText(parseInt(lblNumber.html()));
            if (cardinalText.trim().toLowerCase() === txt.val().toLowerCase()) {
                row.addClass('rowSuccess');
            }
            else {
                lblError.html(cardinalText);
                lblError.removeClass('hide');
                row.addClass('rowError');
            }
        } else {
            row.addClass('rowError');
        }
    }
}
var positions = [0, 1000, 1000000, 1000000000];

function convertNumberToCardinalText(number) {
    var threeNumber = 3;
    var numberText = number.toString();
    var lengthOfNumber = numberText.length;
    var partial = lengthOfNumber / threeNumber;
    if (partial <= 1) {
        return convertThreeDigitsLastToText(number);
    } else {
        var partialRound = Math.ceil(partial);
        var results = "";
        var partSoDu = lengthOfNumber % threeNumber;
        if (partSoDu == 0) {
            partSoDu = threeNumber;
        }
        var positionEndOfPartBefore = 0;
        for (i = 0; i < partialRound; i++) {
            var startIndex = positionEndOfPartBefore;
            var endIndex = (threeNumber * i) + partSoDu;
            var n = parseInt(numberText.substring(startIndex, endIndex));

            positionEndOfPartBefore = endIndex;
            var nt = convertThreeDigitsLastToText(n);
            if (nt != "") {
                results += nt.trim() + " ";
                if (partialRound - (1 + i) > -1) {
                    results += getCardinalTextByNumber(positions[partialRound - (1 + i)]) + " ";
                }
            }
        }
        return results.trim()
    }
}

function convertThreeDigitsLastToText(number) {
    if (number <= 20) {
        return getCardinalTextByNumber(number);
    } else {
        var numberText = number.toString();
        var lengthOfNumber = numberText.length;
        var result = "";
        for (var j = 0; j < lengthOfNumber; j++) {
            var twoDigitsLast = parseInt(numberText.substring(lengthOfNumber - 2));
            if (twoDigitsLast <= 20 && (lengthOfNumber - j <= 2)) {
                result += getCardinalTextByNumber(twoDigitsLast);
                return result
            } else {
                var firstChar = numberText.charAt(j);
                var numberProcessText = firstChar;

                if (lengthOfNumber - j > 2) {
                    if (parseInt(firstChar) / 1 != 0) {
                        result += getCardinalTextByNumber(parseInt(firstChar)) + " ";
                        numberProcessText = "1";
                    }
                }
                for (var i = 0; i < lengthOfNumber - (j + 1); i++) {
                    numberProcessText += "0";
                }
                if (parseInt(numberProcessText) / 1 != 0) {
                    result += getCardinalTextByNumber(parseInt(numberProcessText)) + " ";
                }
            }
        }
        return result.trim();
    }
}

function checkOrdinalNumber() {
    console.log('checkOrdinalNumber running...');
}

function checkAcronym() {
    console.log('checkAcronym running...');
}



// - - - Begin Rows - - -
function getLengthOfRows(rows) {
    // if (rows != null && rows != typeof (undefined)) {
    //     return getRows().length;
    // }
    // return 0;
    return 2;
}

function getRows() {
    return $('#randomNumberTbl').find('tr');
}
// - - - End Rows - - -