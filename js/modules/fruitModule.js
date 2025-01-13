var fruitModule = {
    random: {
        vocabulary: function vocabulary() {
            var rows = helperModule.getRows();
            var lengthOfRows = helperModule.getLengthOfRows(rows);

            for (var i = 1; i < lengthOfRows; i++) {
                var row = rows.eq(i);
                var firstColumn = row.find('td.firstColumn');
                var num = utilities.random.numberWithRange(15);
                var item = fruitTbl[num];
                var lbl = firstColumn.find('.lbl');
                lbl.html(item.meaningVN);
                var hdf = firstColumn.find('.hdf');
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
        vocabulary: function vocabulary() {
            var rows = helperModule.getRows();
            var lengthOfRows = helperModule.getLengthOfRows(rows);
            var scores = 0;
            for (var i = 1; i < lengthOfRows; i++) {
                var row = rows.eq(i);
                var firstColumn = row.find('td.firstColumn');
                var content = firstColumn.find('.hdf').val();

                scores += helperModule.validationCell(row, "secondColumn", fruitService.get.answer.what(content));
                scores += helperModule.validationCell(row, "thirdColumn", fruitService.get.answer.favorite(content));
                scores += helperModule.validationCell(row, "fourthColumn", fruitService.get.answer.howMuch(content, 2));
            }
            $('#scoreLbl').html(scores + "/30");
        }
    }
}