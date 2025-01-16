var fruitService = {
    get: {
        answer: {
            name(keyword) {
                return fruitRepository.get.name(keyword);
            },
            what(keyword) {
                var name = fruitService.get.answer.name(keyword);
                return grammarService.get.sentence.what(name);
            },
            favorite(keyword) {
                var name = fruitService.get.answer.name(keyword);
                return grammarService.get.sentence.favorite(name, 'fruit');
            },
            howMuch(objInfo) {
                var name = fruitService.get.answer.name(objInfo.keyword);
                return grammarService.get.sentence.howMuch(name, objInfo.amount);
            },
        }
    }
}