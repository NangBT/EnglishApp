const numberModule = {
    /* #region  Random Number For Cells Label */
    random: function random() {
        $('#firstTh').html('Number');
        $('#secondTh').html('Cardinal Number');
        $('#thirdTh').html('Ordinal Number');
        $('#fourTh').html('Acronym');
        $('.fourthColumn').show();
        let rows = helperModule.getRows();
        let lengthOfRows = helperModule.getLengthOfRows(rows);

        for (let i = 1; i < lengthOfRows; i++) {
            let row = rows.eq(i);

            let randomValue = utilities.random.number();
            let lbl = row.find("td.firstColumn .lbl");
            lbl.html(utilities.format.numberToText(randomValue));

            let hdf = row.find("td.firstColumn .hdf");
            hdf.val(randomValue);
            helperModule.resetRow(row);
        }
    },
    /* #endregion */
    /* #region  Validation Number */
    validation: function validation() {
        let rows = helperModule.getRows();
        let lengthOfRows = helperModule.getLengthOfRows(rows);
        let scores = 0;
        for (let i = 1; i < lengthOfRows; i++) {
            let row = rows.eq(i);
            let firstColumn = row.find('td.firstColumn');
            let content = firstColumn.find('.hdf').val();
            let numberValue = parseInt(content);

            scores += helperModule.validationCell(row, "secondColumn", numberService.convertNumberToText, numberValue);

            let ordinalNumberText = numberService.convertThreeDigitToOrdinalText(numberValue).trim();
            scores += helperModule.validationCell(row, "thirdColumn", null, ordinalNumberText);

            let twoCharacterLast = "";
            if (ordinalNumberText.length > 2) {
                twoCharacterLast = ordinalNumberText.substring(ordinalNumberText.length - 2, ordinalNumberText.length);
            }
            scores += helperModule.validationCell(row, "fourthColumn", null, (utilities.format.numberToText(content) + twoCharacterLast));
            $('#scoreLbl').html(scores + "/30");
        }
    }
    /* #endregion */
}