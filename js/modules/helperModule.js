var helperModule = {
    /* #region  Get Rows In Table */
    getRows: function getRows() {
        return $("#randomNumberTbl").find("tr");
    },
    /* #endregion */
    /* #region  Get Length Of Rows */
    getLengthOfRows: function getLengthOfRows(rows) {
        if (rows != null && rows != typeof undefined) {
            return helperModule.getRows().length;
        }
        return 0;
        //return 2;
    },
    /* #endregion */
    /* #region  Reset Cell */
    resetCell: function resetCell(row, cellClass) {
        var cell = row.find("td." + cellClass);
        cell.removeClass('successCell');
        cell.removeClass('errorCell');

        var txt = cell.find(".txt");
        txt.val("");

        var errorLbl = cell.find(".errorLbl");
        errorLbl.addClass("hide");
        errorLbl.html("");
    },
    /* #endregion */
    /* #region  Reset Row */
    resetRow: function resetRow(row) {
        helperModule.resetCell(row, "secondColumn");
        helperModule.resetCell(row, "thirdColumn");
        helperModule.resetCell(row, "fourthColumn");

        row.removeClass("successCell");
        row.removeClass("errorCell");
    },
    /* #endregion */
    /* #region  Validation Cell */
    validationCell: function validationCell(row, cellClass, isValueValid) {
        var score = 0;
        var cell = row.find('td.' + cellClass);
        cell.removeClass('errorCell');
        cell.removeClass('successCell');

        var errorLbl = cell.find('.errorLbl');
        errorLbl.addClass('hide');
        errorLbl.removeClass('error');

        var content = cell.find('.txt').val().toLowerCase().trim();
        if (content.length > 0) {
            if (content === isValueValid.toLowerCase()) {
                cell.addClass('successCell');
                score++;
            }
            else {
                errorLbl.html(isValueValid);
                errorLbl.removeClass('hide');
                errorLbl.addClass('error');
                cell.addClass('errorCell');
            }
        }
        return score;
    }
    /* #endregion */
}