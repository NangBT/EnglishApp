var countryNationalityRepository = {
    get: {
        infoByMeaningVN(meaningVN) {
            return countryNationalityTbl.find(e => e.meaningVN === meaningVN);
        },
        country(meaningVn) {
            var item = countryNationalityRepository.get.infoByMeaningVN(meaningVn);
            if (item != null && item != typeof (undefined)) {
                return item.country;
            }
        },
        nationality(meaningVn) {
            var item = countryNationalityRepository.get.infoByMeaningVN(meaningVn);
            if (item != null && item != typeof (undefined)) {
                return item.nationality;
            }
        }
    }
}