const numberModule = {
    /* #region  Random Number For Cells Label */
    random: function random() {
        /* #region  Header Of Table */
        $('#firstTh').html('Number');
        $('#secondTh').html('Cardinal Number');
        $('#thirdTh').html('Ordinal Number');
        $('#fourTh').html('Acronym');
        $('.fourthColumn').show();

        helperModule.set.totalScores(3);
        /* #endregion */

        /* #region  Random value for first column */
        let rows = helperModule.get.rows();
        let lengthOfRows = helperModule.get.lengthOfRows(rows);

        for (let i = 1; i < lengthOfRows; i++) {
            let row = rows.eq(i);

            let randomValue = utilities.random.number();
            let lbl = row.find("td.firstColumn .lbl");
            lbl.html(utilities.format.numberToText(randomValue));

            let hdf = row.find("td.firstColumn .hdf");
            hdf.val(randomValue);
            helperModule.reset.row(row);
        }
        /* #endregion */
    },
    /* #endregion */
    /* #region  Validation Number */
    validation() {
        let rows = helperModule.get.rows();
        let lengthOfRows = helperModule.get.lengthOfRows(rows);
        let scores = 0;
        for (let i = 1; i < lengthOfRows; i++) {
            let row = rows.eq(i);
            let firstColumn = row.find('td.firstColumn');
            let content = firstColumn.find('.hdf').val();
            let numberValue = parseInt(content);

            scores += helperModule.validation.cell(row, "secondColumn", numberService.convertNumberToText, numberValue);
            let ordinalNumberText = numberService.convertDigitsToOrdinalText(numberValue).trim();
            scores += helperModule.validation.cell(row, "thirdColumn", null, ordinalNumberText);

            let twoCharacterLast = "";
            if (ordinalNumberText.length > 2) {
                twoCharacterLast = ordinalNumberText.substring(ordinalNumberText.length - 2, ordinalNumberText.length);
            }
            scores += helperModule.validation.cell(row, "fourthColumn", null, (utilities.format.numberToText(content) + twoCharacterLast));
        }
        helperModule.set.scores(scores);
    }
    /* #endregion */
}