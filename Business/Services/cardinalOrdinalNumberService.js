function bindingData() {
    var rows = getRows();
    var lengthOfRows = getLengthOfRows(rows);
    for (var i = 1; i < lengthOfRows; i++) {
        // var lbl = rows.eq(i).find('label');
        // lbl.html(formatNumber(randomNumber()));

        var txt = rows.eq(i).find('td.numberCol .txt');
        txt.val(formatNumber(randomNumber()));
    }
}

function checkCardinalNumber() {

    var rows = getRows();
    var lengthOfRows = getLengthOfRows(rows);

    for (var i = 1; i < lengthOfRows; i++) {

        var lbl = rows.eq(i).find('td.numberCol .txt');
        var txt = rows.eq(i).find('.txt');
        rows.eq(i).removeClass('rowSuccess');
        rows.eq(i).removeClass('rowError');
        if (txt.val().length > 0) {
            // console.log('Result: ', convertNumberToCardinal(parseInt(lbl.html())));
            console.log('Result: ', convertNumberToCardinal(parseInt(lbl.val())));
            //rows.eq(i).addClass('rowSuccess');
        } else {
            rows.eq(i).addClass('rowError');
        }
    }
}
var positions = [0, 1000, 1000000, 1000000000];

function convertNumberToCardinal(number) {
    var threeNumber = 3;
    var parts = number.toString().length / threeNumber;
    if (parts <= 1) {
        return convertThreeDigitsLastToText(number);
    } else {
        var lamRound = Math.ceil(parts);
        var results = "";
        var partSoDu = number.toString().length % threeNumber;
        if (partSoDu == 0) {
            partSoDu = threeNumber;
        }
        var lengthOfChuoiTruocDo = 0;
        for (i = 0; i < lamRound; i++) {
            var startIndex = lengthOfChuoiTruocDo;
            var endIndex = (number.toString().length + (startIndex)) - threeNumber;

            var endIndex = (threeNumber * i) + partSoDu;
            var n = parseInt(number.toString().substring(startIndex, endIndex));

            lengthOfChuoiTruocDo = endIndex;
            var nt = convertThreeDigitsLastToText(n);
            if (nt != "") {

                results += nt.trim() + " ";
                if (lamRound - (1 + i) > -1) {
                    results += getCardinalTextByNumber(positions[lamRound - (1 + i)]) + " ";

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
        var lengthOfNumber = number.toString().length;
        var result = "";
        for (var j = 0; j < lengthOfNumber; j++) {
            var firstChar = number.toString().charAt(j);

            var numberText = firstChar;
            var twoDigitsLast = parseInt(number.toString().substring(lengthOfNumber - 2));
            if (twoDigitsLast <= 20 && (lengthOfNumber - j <= 2)) {
                result += getCardinalTextByNumber(twoDigitsLast);
                return result
            } else {
                if (lengthOfNumber - j > 2) {
                    if (parseInt(firstChar) / 1 != 0) {
                        result += getCardinalTextByNumber(parseInt(firstChar)) + " ";
                        numberText = "1";
                    }
                }
                for (var i = 0; i < lengthOfNumber - (j + 1); i++) {
                    numberText += "0";
                }
                if (parseInt(numberText) / 1 != 0) {
                    result += getCardinalTextByNumber(parseInt(numberText)) + " ";
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