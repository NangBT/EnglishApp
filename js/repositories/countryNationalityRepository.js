const countryNationalityRepository = {
    get: {
        infoByMeaningVN(meaningVN) {
            return countryNationalityTbl.find(e => e.meaningVN === meaningVN);
        },
        country(meaningVn) {
            let item = countryNationalityRepository.get.infoByMeaningVN(meaningVn);
            if (item != null && item != typeof (undefined)) {
                return item.country;
            }
        },
        nationality(meaningVn) {
            let item = countryNationalityRepository.get.infoByMeaningVN(meaningVn);
            if (item != null && item != typeof (undefined)) {
                return item.nationality;
            }
        }
    }
}