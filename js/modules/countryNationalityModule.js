const countryNationalityModule = {
    /* #region  Random Country And Nationality For Cells Label */
    random: {
        vocabulary() {
            const configInfo = {
                columns: [
                    { title: 'Meaning' },
                    { title: 'Country' },
                    { title: 'Nationality' }
                ],
                callBackFunc: utilities.random.numberWithRange,
                paramsOfFunc: countryNationalityTbl.length,
                data: countryNationalityTbl
            }
            helperModule.random.row(configInfo);
        },
        /* #endregion */
        /* #region  Random Question Country And Nationality For Cells Label */
        question() {
            const configInfo = {
                columns: [
                    { title: 'Meaning' },
                    { title: 'Where are you from ?' },
                    { title: 'What is your nationality ?' }
                ],
                callBackFunc: utilities.random.numberWithRange,
                paramsOfFunc: countryNationalityTbl.length,
                data: countryNationalityTbl
            }
            helperModule.random.row(configInfo);
        },
        /* #endregion */
    },
    validation: {
        vocabulary() {
            let rows = helperModule.get.rows();
            let lengthOfRows = helperModule.get.lengthOfRows(rows);
            let scores = 0;
            for (let i = 1; i < lengthOfRows; i++) {
                let row = rows.eq(i);
                let firstColumn = row.find('td.firstColumn');
                let content = firstColumn.find('.hdf').val();

                scores += helperModule.validation.cell(row, "secondColumn", countryNationalityService.get.vocabulary.country, content);
                scores += helperModule.validation.cell(row, "thirdColumn", countryNationalityService.get.vocabulary.nationality, content);
            }
            helperModule.set.scores(scores);
        },
        question() {
            let rows = helperModule.get.rows();
            let lengthOfRows = helperModule.get.lengthOfRows(rows);
            let scores = 0;
            for (let i = 1; i < lengthOfRows; i++) {
                let row = rows.eq(i);
                let firstColumn = row.find('td.firstColumn');
                let content = firstColumn.find('.hdf').val();

                scores += helperModule.validation.cell(row, "secondColumn", countryNationalityService.get.answer.country, content);
                scores += helperModule.validation.cell(row, "thirdColumn", countryNationalityService.get.answer.nationality, content);
            }
            helperModule.set.scores(scores);
        }
    }
}