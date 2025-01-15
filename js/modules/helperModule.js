const helperModule = {
    /* #region  Get Rows In Table */
    getRows() {
        return $("#randomNumberTbl").find("tr");
    },
    /* #endregion */
    /* #region  Get Length Of Rows */
    getLengthOfRows(rows) {
        if (rows != null && rows != typeof undefined) {
            return helperModule.getRows().length;
        }
        return 0;
        //return 2;
    },
    /* #endregion */
    /* #region  Reset Cell */
    resetCell(row, cellClass) {
        let cell = row.find("td." + cellClass);
        cell.removeClass('successCell');
        cell.removeClass('errorCell');

        let txt = cell.find(".txt");
        txt.val("");

        let errorLbl = cell.find(".errorLbl");
        errorLbl.addClass("hide");
        errorLbl.html("");
    },
    /* #endregion */
    /* #region  Reset Row */
    resetRow(row) {
        helperModule.resetCell(row, "secondColumn");
        helperModule.resetCell(row, "thirdColumn");
        helperModule.resetCell(row, "fourthColumn");

        row.removeClass("successCell");
        row.removeClass("errorCell");
    },
    /* #endregion */
    /* #region  Validation Cell */
    validationCell(row, cellClass, callBackFunc, objInfo) {
        let score = 0;
        let cell = row.find('td.' + cellClass);
        cell.removeClass('errorCell');
        cell.removeClass('successCell');

        let errorLbl = cell.find('.errorLbl');
        errorLbl.addClass('hide');
        errorLbl.removeClass('error');

        let content = cell.find('.txt').val().toLowerCase().trim();
        if (content.length > 0) {
            let isValueValid = "";
            if (callBackFunc != null) {
                isValueValid = callBackFunc(objInfo);
            }
            else {
                isValueValid = objInfo
            }

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