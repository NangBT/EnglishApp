var countryNationalityModule = {
    /* #region  Random Country And Nationality For Cells Label */
    random: {
        vocabulary: function randomVocabulary() {
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
        question: function randomQuestion() {
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
            $('#secondTh').html('Where are you from?');
            $('#thirdTh').html('What is your nationality?');
            $('.fourthColumn').hide();
        },
        /* #endregion */
    },
    validation: {
        vocabulary: function validationVocabulary() {
            var rows = helperModule.getRows();
            var lengthOfRows = helperModule.getLengthOfRows(rows);
            var scores = 0;
            for (var i = 1; i < lengthOfRows; i++) {
                var row = rows.eq(i);
                var firstColumn = row.find('td.firstColumn');
                var content = firstColumn.find('.hdf').val();

                scores += helperModule.validationCell(row, "secondColumn", countryNationalityService.getCountry(content));
                scores += helperModule.validationCell(row, "thirdColumn", countryNationalityService.getNationality(content));
            }
            $('#scoreLbl').html(scores + "/20");
        },
        question: function validationQuestion() {
            var rows = helperModule.getRows();
            var lengthOfRows = helperModule.getLengthOfRows(rows);
            var scores = 0;
            for (var i = 1; i < lengthOfRows; i++) {
                var row = rows.eq(i);
                var firstColumn = row.find('td.firstColumn');
                var content = firstColumn.find('.hdf').val();

                var countryAnswer = "I am from " + countryNationalityService.getCountry(content);
                scores += helperModule.validationCell(row, "secondColumn", countryAnswer.toLowerCase());

                var nationalityAnswer = "I am " + countryNationalityService.getNationality(content);
                scores += helperModule.validationCell(row, "thirdColumn", nationalityAnswer.toLowerCase());
            }
            $('#scoreLbl').html(scores + "/20");
        }
    }
}