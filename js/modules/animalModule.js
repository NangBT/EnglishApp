var animalModule = {
    random: {
        vocabulary: function vocabulary() {
            var rows = helperModule.getRows();
            var lengthOfRows = helperModule.getLengthOfRows(rows);

            for (var i = 1; i < lengthOfRows; i++) {
                var row = rows.eq(i);
                var firstColumn = row.find('td.firstColumn');
                var num = utilities.random.numberWithRange(animalTbl.length - 1);
                var item = animalTbl[num];
                var lbl = firstColumn.find('.lbl');
                lbl.html(item.meaningVN);
                var hdf = firstColumn.find('.hdf');
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
        vocabulary: function vocabulary() {
            var rows = helperModule.getRows();
            var lengthOfRows = helperModule.getLengthOfRows(rows);
            var scores = 0;
            for (var i = 1; i < lengthOfRows; i++) {
                var row = rows.eq(i);
                var firstColumn = row.find('td.firstColumn');
                var content = firstColumn.find('.hdf').val();

                scores += helperModule.validationCell(row, "secondColumn", animalService.get.answer.what(content));
                scores += helperModule.validationCell(row, "thirdColumn", animalService.get.answer.favorite(content));
                scores += helperModule.validationCell(row, "fourthColumn", animalService.get.answer.howMuch(content, 1));
            }
            $('#scoreLbl').html(scores + "/30");
        }
    }
}