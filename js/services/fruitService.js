const fruitService = {
    get: {
        answer: {
            name(keyword) {
                return fruitRepository.get.name(keyword);
            },
            what(keyword) {
                let name = fruitService.get.answer.name(keyword);
                return grammarService.get.sentence.what(name);
            },
            favorite(objInfo) {
                let name = fruitService.get.answer.name(objInfo.keyword);
                let favoriteInfo = { name: name, amount: 1, typeName: 'fruit' };
                return grammarService.get.sentence.favorite(favoriteInfo);
            },
            howMuch(objInfo) {
                let name = fruitService.get.answer.name(objInfo.keyword);
                let info = { name: name, amount: objInfo.amount };
                return grammarService.get.sentence.howMuch(info);
            },
        }
    }
}