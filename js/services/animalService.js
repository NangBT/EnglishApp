const animalService = {
    get: {
        answer: {
            name(keyword) {
                return animalRepository.get.name(keyword);
            },
            what(keyword) {
                let name = animalService.get.answer.name(keyword);
                return grammarService.get.sentence.what(name);
            },
            favorite(objInfo) {
                let name = animalService.get.answer.name(objInfo.keyword);
                let favoriteInfo = { name: name, amount: 1, typeName: 'animal' };
                return grammarService.get.sentence.favorite(favoriteInfo);
            },
            howMuch(objInfo) {
                let name = animalService.get.answer.name(objInfo.keyword);
                let howMuchInfo = { name: name, amount: objInfo.amount };
                return grammarService.get.sentence.howMuch(howMuchInfo);
            }
        }
    }
}