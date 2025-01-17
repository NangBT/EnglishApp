const helperModule = {
    get: {
        /* #region  Get Rows In Table */
        rows() {
            return $("#randomNumberTbl").find("tr");
        },
        /* #endregion */
        /* #region  Get Length Of Rows */
        lengthOfRows(rows) {
            if (rows != null && rows != typeof undefined) {
                return rows.length;
            }
            else {
                return helperModule.get.rows().length;
            }
            //return 0;
            //return 2;
        },
        /* #endregion */
    },
    reset: {
        /* #region  Reset Cell */
        cell(row, cellClass) {
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
        row(row) {
            helperModule.reset.cell(row, "secondColumn");
            helperModule.reset.cell(row, "thirdColumn");
            helperModule.reset.cell(row, "fourthColumn");

            row.removeClass("successCell");
            row.removeClass("errorCell");
        },
        /* #endregion */
    },
    validation: {
        /* #region  Validation Cell */
        cell(row, cellClass, callBackFunc, objInfo) {
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
        },
        /* #endregion */
    },

    random: {
        row(configInfo) {
            let rows = helperModule.get.rows();
            let lengthOfRows = helperModule.get.lengthOfRows(rows);

            for (let i = 1; i < lengthOfRows; i++) {
                let row = rows.eq(i);
                let firstColumn = row.find('td.firstColumn');
                let num = configInfo.callBackFunc(configInfo.paramsOfFunc);
                let item = configInfo.data[num];
                let lbl = firstColumn.find('.lbl');
                lbl.html(item.meaningVN);
                let hdf = firstColumn.find('.hdf');
                hdf.val(item.meaningVN);

                helperModule.reset.row(row);
            }

            for (let index = 0; index < configInfo.columns.length; index++) {
                const item = configInfo.columns[index];
                let columnId = '';
                let columnClass = '';
                if (index === 0) {
                    columnId = 'firstTh';
                    columnClass = 'firstColumn'
                }
                else if (index === 1) {
                    columnId = 'secondTh';
                    columnClass = 'secondColumn'
                }
                else if (index === 2) {
                    columnId = 'thirdTh';
                    columnClass = 'thirdColumn'
                }
                else if (index === 3) {
                    columnId = 'fourTh';
                    columnClass = 'fourthColumn'
                }
                $('#' + columnId).html(item.title);
                $('.' + columnClass).show();
            }
        }
    }
}