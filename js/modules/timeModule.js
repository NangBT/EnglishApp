const timeModule = {
    /* #region  Random Time For Cells Label */
    random() {
        let rows = helperModule.get.rows();
        let lengthOfRows = helperModule.get.lengthOfRows(rows);

        for (let i = 1; i < lengthOfRows; i++) {
            let row = rows.eq(i);
            let firstColumn = row.find('td.firstColumn');
            let randomValue = utilities.random.time();

            let lbl = firstColumn.find('.lbl');
            lbl.html(moment(randomValue).format('HH:mm'));
            let hdf = firstColumn.find('.hdf');
            hdf.val(randomValue);

            helperModule.reset.row(row);
        }

        $('#firstTh').html('Time');
        $('#secondTh').html('Telling The Time (Read - AM/PM)');
        $('#thirdTh').html('Telling The Time (Read - In)');
        $('#fourTh').html('Telling The Time (Write)');
        $('.fourthColumn').show();
    },
    /* #endregion */
    /* #region  Validation Telling The Time */
    validation() {
        let rows = helperModule.get.rows();
        let lengthOfRows = helperModule.get.lengthOfRows(rows);
        let scores = 0;
        for (let i = 1; i < lengthOfRows; i++) {
            let row = rows.eq(i);
            let firstColumn = row.find('td.firstColumn');
            let content = firstColumn.find('.hdf').val();
            let hours = parseInt(moment(content).format('HH'));
            let minutes = parseInt(moment(content).format('mm'));

            let secondInfoObj = { hours: hours, minutes: minutes, sessionType: TIMING_CONST.SESSION_TYPE.AM_PM };
            scores += helperModule.validation.cell(row, "secondColumn", timeService.get.tellingTime, secondInfoObj);

            let thirdInfoObj = { hours: hours, minutes: minutes, sessionType: TIMING_CONST.SESSION_TYPE.IN };
            scores += helperModule.validation.cell(row, "thirdColumn", timeService.get.tellingTime, thirdInfoObj);

            let fourthInfoObj = { hours: hours, minutes: minutes, sessionType: TIMING_CONST.SESSION_TYPE.IN };
            scores += helperModule.validation.cell(row, "fourthColumn", timeService.get.writeTime, fourthInfoObj);

        }
        $('#scoreLbl').html(scores + "/30");
    }
    /* #endregion */
}