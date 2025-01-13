var countryNationalityModule = {
    /* #region  Random Country And Nationality For Cells Label */
    random: {
        vocabulary: function vocabulary() {
            var rows = helperModule.getRows();
            var lengthOfRows = helperModule.getLengthOfRows(rows);

            for (var i = 1; i < lengthOfRows; i++) {
                var row = rows.eq(i);
                var firstColumn = row.find('td.firstColumn');
                var num = utilities.random.numberWithRange(10);
                var item = countryNationalityTbl[num];
                var lbl = firstColumn.find('.lbl');
                lbl.html(item.meaningVN);
                var hdf = firstColumn.find('.hdf');
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
            var rows = helperModule.getRows();
            var lengthOfRows = helperModule.getLengthOfRows(rows);

            for (var i = 1; i < lengthOfRows; i++) {
                var row = rows.eq(i);
                var firstColumn = row.find('td.firstColumn');
                var num = utilities.random.numberWithRange(10);
                var item = countryNationalityTbl[num];
                var lbl = firstColumn.find('.lbl');
                lbl.html(item.meaningVN);
                var hdf = firstColumn.find('.hdf');
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
            var rows = helperModule.getRows();
            var lengthOfRows = helperModule.getLengthOfRows(rows);
            var scores = 0;
            for (var i = 1; i < lengthOfRows; i++) {
                var row = rows.eq(i);
                var firstColumn = row.find('td.firstColumn');
                var content = firstColumn.find('.hdf').val();

                scores += helperModule.validationCell(row, "secondColumn", countryNationalityService.get.answer.country(content));
                scores += helperModule.validationCell(row, "thirdColumn", countryNationalityService.get.answer.nationality(content));
            }
            $('#scoreLbl').html(scores + "/20");
        },
        question: function question() {
            var rows = helperModule.getRows();
            var lengthOfRows = helperModule.getLengthOfRows(rows);
            var scores = 0;
            for (var i = 1; i < lengthOfRows; i++) {
                var row = rows.eq(i);
                var firstColumn = row.find('td.firstColumn');
                var content = firstColumn.find('.hdf').val();

                var countryAnswer = countryNationalityService.get.answer.country(content);
                scores += helperModule.validationCell(row, "secondColumn", countryAnswer);

                var nationalityAnswer = countryNationalityService.get.answer.nationality(content);
                scores += helperModule.validationCell(row, "thirdColumn", nationalityAnswer);
            }
            $('#scoreLbl').html(scores + "/20");
        }
    }
}