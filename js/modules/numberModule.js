var numberModule = {
    /* #region  Random Number For Cells Label */
    random: function random() {
        $('#firstTh').html('Number');
        $('#secondTh').html('Cardinal Number');
        $('#thirdTh').html('Ordinal Number');
        $('#fourTh').html('Acronym');
        $('.fourthColumn').show();
        var rows = helperModule.getRows();
        var lengthOfRows = helperModule.getLengthOfRows(rows);

        for (var i = 1; i < lengthOfRows; i++) {
            var row = rows.eq(i);

            var randomValue = utilities.random.number();
            var lbl = row.find("td.firstColumn .lbl");
            lbl.html(utilities.format.numberToText(randomValue));

            var hdf = row.find("td.firstColumn .hdf");
            hdf.val(randomValue);
            helperModule.resetRow(row);
        }
    },
    /* #endregion */
    /* #region  Validation Number */
    validation: function validation() {
        var rows = helperModule.getRows();
        var lengthOfRows = helperModule.getLengthOfRows(rows);
        var scores = 0;
        for (var i = 1; i < lengthOfRows; i++) {
            var row = rows.eq(i);
            var firstColumn = row.find('td.firstColumn');
            var content = firstColumn.find('.hdf').val();
            var numberValue = parseInt(content);
            scores += helperModule.validationCell(row, "secondColumn", numberService.convertNumberToText(numberValue).trim());

            var ordinalNumberText = numberService.convertThreeDigitToOrdinalText(numberValue).trim();
            scores += helperModule.validationCell(row, "thirdColumn", ordinalNumberText);

            var twoCharacterLast = "";
            if (ordinalNumberText.length > 2) {
                twoCharacterLast = ordinalNumberText.substring(ordinalNumberText.length - 2, ordinalNumberText.length);
            }
            scores += helperModule.validationCell(row, "fourthColumn", utilities.format.numberToText(content) + twoCharacterLast);
            $('#scoreLbl').html(scores + "/30");
        }
    }
    /* #endregion */
}