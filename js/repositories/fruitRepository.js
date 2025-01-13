var fruitRepository = {
    get: {
        infoByMeaningVN: function infoByMeaningVN(meaningVN) {
            return fruitTbl.find(e => e.meaningVN === meaningVN);
        },
        name: function name(meaningVN) {
            var item = fruitRepository.get.infoByMeaningVN(meaningVN);
            if (item != null && item != typeof (undefined)) {
                return item.name;
            }
        }
    }
}