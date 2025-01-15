const fruitModule = {
    random: {
        vocabulary() {
            let rows = helperModule.getRows();
            let lengthOfRows = helperModule.getLengthOfRows(rows);

            for (let i = 1; i < lengthOfRows; i++) {
                let row = rows.eq(i);
                let firstColumn = row.find('td.firstColumn');
                let num = utilities.random.numberWithRange(15);
                let item = fruitTbl[num];
                let lbl = firstColumn.find('.lbl');
                lbl.html(item.meaningVN);
                let hdf = firstColumn.find('.hdf');
                hdf.val(item.meaningVN);

                helperModule.resetRow(row);
            }

            $('#firstTh').html('Meaning');
            $('#secondTh').html('What fruit is it ?');
            $('#thirdTh').html('What’s your favorite one ?');
            $('#fourTh').html('How many is fruit_name ?');
            $('.fourthColumn').show();
        }
    },
    validation: {
        vocabulary() {
            let rows = helperModule.getRows();
            let lengthOfRows = helperModule.getLengthOfRows(rows);
            let scores = 0;
            for (let i = 1; i < lengthOfRows; i++) {
                let row = rows.eq(i);
                let firstColumn = row.find('td.firstColumn');
                let content = firstColumn.find('.hdf').val();

                scores += helperModule.validationCell(row, "secondColumn", fruitService.get.answer.what, content);
                scores += helperModule.validationCell(row, "thirdColumn", fruitService.get.answer.favorite, content);

                let infoObj = { keyword: content, amount: 2 };
                scores += helperModule.validationCell(row, "fourthColumn", fruitService.get.answer.howMuch, infoObj);
            }
            $('#scoreLbl').html(scores + "/30");
        }
    }
}