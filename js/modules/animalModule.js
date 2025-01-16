const animalModule = {
    random: {
        vocabulary() {
            let rows = helperModule.getRows();
            let lengthOfRows = helperModule.getLengthOfRows(rows);

            for (let i = 1; i < lengthOfRows; i++) {
                let row = rows.eq(i);
                let firstColumn = row.find('td.firstColumn');
                let num = utilities.random.numberWithRange(animalTbl.length - 1);
                let item = animalTbl[num];
                let lbl = firstColumn.find('.lbl');
                lbl.html(item.meaningVN);
                let hdf = firstColumn.find('.hdf');
                hdf.val(item.meaningVN);

                helperModule.resetRow(row);
            }

            $('#firstTh').html('Meaning');
            $('#secondTh').html('What animal is it ?');
            $('#thirdTh').html('What’s your favorite one ?');
            $('#fourTh').html('How many is animal_name ?');
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

                scores += helperModule.validationCell(row, "secondColumn", animalService.get.answer.what, content);
                scores += helperModule.validationCell(row, "thirdColumn", animalService.get.answer.favorite, content);

                let infoObj = { keyword: content, amount: 1 };
                scores += helperModule.validationCell(row, "fourthColumn", animalService.get.answer.howMuch, infoObj);
            }
            $('#scoreLbl').html(scores + "/30");
        }
    }
}