var fruitService = {
    get: {
        answer: {
            name: function name(keyword) {
                return fruitRepository.get.name(keyword);
            },
            what: function what(keyword) {
                var name = fruitService.get.answer.name(keyword);
                return grammarService.get.sentence.what(name);
            },
            favorite: function favorite(keyword) {
                var name = fruitService.get.answer.name(keyword);
                return grammarService.get.sentence.favorite(name, 'fruit');
            },
            howMuch: function howMuch(keyword, amount) {
                var name = fruitService.get.answer.name(keyword);
                return grammarService.get.sentence.howMuch(name, amount);
            },
        }
    }
}