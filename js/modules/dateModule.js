var dateModule = {
    /* #region  Random Date For Cells Label */
    random: function random() {
        var rows = helperModule.getRows();
        var lengthOfRows = helperModule.getLengthOfRows(rows);

        for (var i = 1; i < lengthOfRows; i++) {
            var row = rows.eq(i);

            var randomValue = utilities.random.date();
            var lbl = row.find("td.firstColumn .lbl");
            lbl.html(moment(randomValue).format('d - DD/MM/YYYY'));

            var hdf = row.find("td.firstColumn .hdf");
            hdf.val(randomValue);
            helperModule.resetRow(row);
        }

        $('#firstTh').html('Date');
        $('#secondTh').html('Full Date (Write)');
        $('#thirdTh').html('Full Date (Read)');
        $('.fourthColumn').hide();
    },
    /* #endregion */

    /* #region  Validation Date */
    validation: function validation() {
        var rows = helperModule.getRows();
        var lengthOfRows = helperModule.getLengthOfRows(rows);
        var scores = 0;
        for (var i = 1; i < lengthOfRows; i++) {
            var row = rows.eq(i);
            var firstColumn = row.find('td.firstColumn');
            var content = firstColumn.find('.hdf').val();
            var dateValue = moment(content);

            scores += helperModule.validationCell(row, "secondColumn", utilities.format.dateToText(dateValue).trim());
            scores += helperModule.validationCell(row, "thirdColumn", numberService.convertDateToFullDateForRead(dateValue));
        }
        $('#scoreLbl').html(scores + "/20");
    }
    /* #endregion */
}