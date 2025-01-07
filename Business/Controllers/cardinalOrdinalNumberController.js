$(document).ready(function () {
    bindingData();

    $('#randomNumberBtn').click(function () {
        bindingData();
    });

    $('#checkResultBtn').click(function () {
        validationNumber();
    });
});

function bindingData() {
    var rows = getRows();
    var lengthOfRows = getLengthOfRows(rows);
    for (var i = 1; i < lengthOfRows; i++) {
        var row = rows.eq(i);

        var num = utilities.randomNumber();
        var lbl = row.find('td.numberCol .lbl');
        lbl.html(utilities.formatNumber(num));

        var hdf = row.find('td.numberCol .hdf');
        hdf.val(num);
        // var txt = row.find('td.numberCol .txt');
        // txt.val(utilities.formatNumber(utilities.randomNumber()));
        resetRow(row);
    }
}

function resetRow(row) {
    var cardinalNumberCol = row.find('td.cardinalNumberCol');
    var cardinalNumberTxt = cardinalNumberCol.find('.txt');
    cardinalNumberTxt.val('');

    var cardinalNumberLblError = cardinalNumberCol.find('.lblError');
    cardinalNumberLblError.addClass('hide');
    cardinalNumberLblError.html('');

    var ordinalNumberCol = row.find('td.ordinalNumberCol');
    var ordinalNumberTxt = ordinalNumberCol.find('.txt');
    ordinalNumberTxt.val('');

    var ordinalNumberLblError = ordinalNumberCol.find('.lblError');
    ordinalNumberLblError.addClass('hide');
    ordinalNumberLblError.html('');

    var acronymCol = row.find('td.acronymCol');
    var acronymTxt = acronymCol.find('.txt');
    acronymTxt.val('');

    var acronymLblError = acronymCol.find('.lblError');
    acronymLblError.addClass('hide');
    acronymLblError.html('');

    row.removeClass('rowSuccess');
    row.removeClass('rowError');
}

function validationNumber() {
    var rows = getRows();
    var lengthOfRows = getLengthOfRows(rows);
    for (var i = 1; i < lengthOfRows; i++) {
        var row = rows.eq(i);
        // var numberValue = row.find('td.numberCol .lbl').html();
        //var numberValue = row.find('td.numberCol .txt').val();

        var hdf = row.find('td.numberCol .hdf');
        var numberValue = hdf.val();

        row.removeClass('rowSuccess');
        row.removeClass('rowError');

        var isCardinalNumber = isValidCell(numberValue, row, 'cardinalNumberCol', cardinalOrdinalNumberConstant.type.cardinal);
        var isOrdinalNumber = isValidCell(numberValue, row, 'ordinalNumberCol', cardinalOrdinalNumberConstant.type.ordinal);
        var isAcronym = isValidCell(numberValue, row, 'acronymCol', cardinalOrdinalNumberConstant.type.ordinal);;

        if (isCardinalNumber && isOrdinalNumber && isAcronym) {
            row.addClass('rowSuccess');
        }
        else {
            row.addClass('rowError');
        }
    }
}

function isValidCell(numberValue, row, classCell, type) {
    var td = row.find('td.' + classCell);
    var txt = td.find('.txt');

    var lblError = td.find('.lblError');
    lblError.addClass('hide');

    if (txt.val().length > 0) {
        console.log('parseInt(numberValue): ', parseInt(numberValue));
        var numberText = cardinalOrdinalNumberService.convertNumberToText(parseInt(numberValue), type);
        if (classCell === 'acronymCol') {
            if (numberText !== '') {
                var twoCharacterLast = numberText.substring(numberText.length - 2, numberText.length);
                console.log('twoCharacterLast: ', twoCharacterLast);
                var acronymText = numberValue + twoCharacterLast.toLowerCase();
                if (txt.val().toLowerCase() === acronymText) {
                    return true;
                }
                else {
                    numberText = acronymText;
                }
            }
        }
        else {
            if ((numberText.trim().toLowerCase() === txt.val().toLowerCase())) {
                return true;
            }
        }
        lblError.html(numberText);
        lblError.removeClass('hide');
    }
    return false;
}

// - - - Begin Rows - - -
function getLengthOfRows(rows) {
    if (rows != null && rows != typeof (undefined)) {
        return getRows().length;
    }
    return 0;
    //return 2;
}

function getRows() {
    return $('#randomNumberTbl').find('tr');
}
// - - - End Rows - - -
