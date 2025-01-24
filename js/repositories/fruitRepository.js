const fruitRepository = {
    get: {
        infoByMeaningVN(meaningVN) {
            return fruitTbl.find(e => e.meaningVN === meaningVN);
        },
        name(meaningVN) {
            let item = fruitRepository.get.infoByMeaningVN(meaningVN);
            if (item != null && item != typeof (undefined)) {
                return item.name;
            }
        }
    }
}