var animalService = {
    get: {
        answer: {
            name(keyword) {
                return animalRepository.get.name(keyword);
            },
            what(keyword) {
                var name = animalService.get.answer.name(keyword);
                return grammarService.get.sentence.what(name);
            },
            favorite(keyword) {
                var name = animalService.get.answer.name(keyword);
                return grammarService.get.sentence.favorite(name, 'animal');
            },
            howMuch(infoObj) {

                var name = animalService.get.answer.name(infoObj.keyword);
                return grammarService.get.sentence.howMuch(name, infoObj.amount);
            }
        }
    }
}