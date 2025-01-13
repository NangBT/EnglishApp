var animalRepository = {
    get: {
        infoByMeaningVN: function infoByMeaningVN(meaningVN) {
            return animalTbl.find(e => e.meaningVN === meaningVN);
        },
        name: function name(meaningVN) {
            var item = animalRepository.get.infoByMeaningVN(meaningVN);
            if (item != null && item != typeof (undefined)) {
                return item.name;
            }
        }
    }
}