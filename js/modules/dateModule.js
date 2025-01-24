const dateModule = {
    /* #region  Random Date For Cells Label */
    random: function random() {
        /* #region  Header Of Table */
        $('#firstTh').html('Date');
        $('#secondTh').html('Full Date (Write)');
        $('#thirdTh').html('Full Date (Read)');
        $('.fourthColumn').hide();

        helperModule.set.totalScores(2);
        /* #endregion */

        /* #region  Random value for first column */
        let rows = helperModule.get.rows();
        let lengthOfRows = helperModule.get.lengthOfRows(rows);

        for (let i = 1; i < lengthOfRows; i++) {
            let row = rows.eq(i);

            let randomValue = utilities.random.date();
            let lbl = row.find("td.firstColumn .lbl");
            lbl.html(moment(randomValue).format('d - DD/MM/YYYY'));

            let hdf = row.find("td.firstColumn .hdf");
            hdf.val(randomValue);
            helperModule.reset.row(row);
        }
        /* #endregion */
    },
    /* #endregion */

    /* #region  Validation Date */
    validation() {
        let rows = helperModule.get.rows();
        let lengthOfRows = helperModule.get.lengthOfRows(rows);
        let scores = 0;
        for (let i = 1; i < lengthOfRows; i++) {
            let row = rows.eq(i);
            let firstColumn = row.find('td.firstColumn');
            let content = firstColumn.find('.hdf').val();
            let dateValue = moment(content);

            scores += helperModule.validation.cell(row, "secondColumn", utilities.format.dateToText, dateValue);
            scores += helperModule.validation.cell(row, "thirdColumn", numberService.convertDateToFullDateForRead, dateValue);
        }
        helperModule.set.scores(scores);
    }
    /* #endregion */
}