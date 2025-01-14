const countryNationalityModule = {
    /* #region  Random Country And Nationality For Cells Label */
    random: {
        vocabulary: function vocabulary() {
            let rows = helperModule.getRows();
            let lengthOfRows = helperModule.getLengthOfRows(rows);

            for (let i = 1; i < lengthOfRows; i++) {
                let row = rows.eq(i);
                let firstColumn = row.find('td.firstColumn');
                let num = utilities.random.numberWithRange(10);
                let item = countryNationalityTbl[num];
                let lbl = firstColumn.find('.lbl');
                lbl.html(item.meaningVN);
                let hdf = firstColumn.find('.hdf');
                hdf.val(item.meaningVN);

                helperModule.resetRow(row);
            }

            $('#firstTh').html('Meaning');
            $('#secondTh').html('Country');
            $('#thirdTh').html('Nationality');
            $('.fourthColumn').hide();
        },
        /* #endregion */
        /* #region  Random Question Country And Nationality For Cells Label */
        question: function question() {
            let rows = helperModule.getRows();
            let lengthOfRows = helperModule.getLengthOfRows(rows);

            for (let i = 1; i < lengthOfRows; i++) {
                let row = rows.eq(i);
                let firstColumn = row.find('td.firstColumn');
                let num = utilities.random.numberWithRange(10);
                let item = countryNationalityTbl[num];
                let lbl = firstColumn.find('.lbl');
                lbl.html(item.meaningVN);
                let hdf = firstColumn.find('.hdf');
                hdf.val(item.meaningVN);

                helperModule.resetRow(row);
            }

            $('#firstTh').html('Meaning');
            $('#secondTh').html('Where are you from ?');
            $('#thirdTh').html('What is your nationality ?');
            $('.fourthColumn').hide();
        },
        /* #endregion */
    },
    validation: {
        vocabulary: function vocabulary() {
            let rows = helperModule.getRows();
            let lengthOfRows = helperModule.getLengthOfRows(rows);
            let scores = 0;
            for (let i = 1; i < lengthOfRows; i++) {
                let row = rows.eq(i);
                let firstColumn = row.find('td.firstColumn');
                let content = firstColumn.find('.hdf').val();

                scores += helperModule.validationCell(row, "secondColumn", countryNationalityService.get.vocabulary.country, content);
                scores += helperModule.validationCell(row, "thirdColumn", countryNationalityService.get.vocabulary.nationality, content);
            }
            $('#scoreLbl').html(scores + "/20");
        },
        question: function question() {
            let rows = helperModule.getRows();
            let lengthOfRows = helperModule.getLengthOfRows(rows);
            let scores = 0;
            for (let i = 1; i < lengthOfRows; i++) {
                let row = rows.eq(i);
                let firstColumn = row.find('td.firstColumn');
                let content = firstColumn.find('.hdf').val();

                scores += helperModule.validationCell(row, "secondColumn", countryNationalityService.get.answer.country, content);
                scores += helperModule.validationCell(row, "thirdColumn", countryNationalityService.get.answer.nationality, content);
            }
            $('#scoreLbl').html(scores + "/20");
        }
    }
}