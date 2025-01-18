const animalModule = {
    random: {
        vocabulary() {
            const configInfo = {
                columns: [
                    { title: 'Meaning' },
                    { title: 'What animal is it ?' },
                    { title: 'What’s your favorite one ?' },
                    { title: 'How many is animal_name ?' }
                ],
                callBackFunc: utilities.random.numberWithRange,
                paramsOfFunc: animalTbl.length - 1,
                data: animalTbl
            }
            helperModule.random.row(configInfo);
        }
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

                scores += helperModule.validation.cell(row, "secondColumn", animalService.get.answer.what, content);
                scores += helperModule.validation.cell(row, "thirdColumn", animalService.get.answer.favorite, content);

                let infoObj = { keyword: content, amount: 1 };
                scores += helperModule.validation.cell(row, "fourthColumn", animalService.get.answer.howMuch, infoObj);
            }
            helperModule.set.scores(scores);
        }
    }
}