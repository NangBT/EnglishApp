var animalService = {
    get: {
        answer: {
            name: function name(keyword) {
                return animalRepository.get.name(keyword);
            },
            what: function what(keyword) {
                var name = animalService.get.answer.name(keyword);
                return grammarService.get.sentence.what(name);
            },
            favorite: function favorite(keyword) {
                var name = animalService.get.answer.name(keyword);
                return grammarService.get.sentence.favorite(name, 'animal');
            },
            howMuch: function howMuch(keyword, amount) {
                var name = animalService.get.answer.name(keyword);
                return grammarService.get.sentence.howMuch(name, amount);
            },
        }
    }
}