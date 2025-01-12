var timeModule = {
    /* #region  Random Time For Cells Label */
    random: function random() {
        var rows = helperModule.getRows();
        var lengthOfRows = helperModule.getLengthOfRows(rows);

        for (var i = 1; i < lengthOfRows; i++) {
            var row = rows.eq(i);
            var firstColumn = row.find('td.firstColumn');
            var randomValue = utilities.random.time();

            var lbl = firstColumn.find('.lbl');
            lbl.html(moment(randomValue).format('HH:mm'));
            var hdf = firstColumn.find('.hdf');
            hdf.val(randomValue);

            helperModule.resetRow(row);
        }

        $('#firstTh').html('Time');
        $('#secondTh').html('Telling The Time (Read - AM/PM)');
        $('#thirdTh').html('Telling The Time (Read - In)');
        $('#fourTh').html('Telling The Time (Write)');
        $('.fourthColumn').show();
    },
    /* #endregion */
    /* #region  Validation Telling The Time */
    validation: function validation() {
        var rows = helperModule.getRows();
        var lengthOfRows = helperModule.getLengthOfRows(rows);
        var scores = 0;
        for (var i = 1; i < lengthOfRows; i++) {
            var row = rows.eq(i);
            var firstColumn = row.find('td.firstColumn');
            var content = firstColumn.find('.hdf').val();
            var hours = parseInt(moment(content).format('HH'));
            var minutes = parseInt(moment(content).format('mm'));

            scores += helperModule.validationCell(row, "secondColumn", timeService.getTellingTimeForRead(hours, minutes, TIMING_CONST.SESSION_TYPE.AM_PM));
            scores += helperModule.validationCell(row, "thirdColumn", timeService.getTellingTimeForRead(hours, minutes, TIMING_CONST.SESSION_TYPE.IN));
            scores += helperModule.validationCell(row, "fourthColumn", timeService.getTellingTimeForWrite(hours, minutes, TIMING_CONST.SESSION_TYPE.IN));

        }
        $('#scoreLbl').html(scores + "/30");
    }
    /* #endregion */
}