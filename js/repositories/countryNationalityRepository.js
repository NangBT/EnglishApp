var countryNationalityRepository = {
    get: {
        infoByMeaningVN: function infoByMeaningVN(meaningVN) {
            return countryNationalityTbl.find(e => e.meaningVN === meaningVN);
        },
        country: function country(meaningVn) {
            var item = countryNationalityRepository.get.infoByMeaningVN(meaningVn);
            if (item != null && item != typeof (undefined)) {
                return item.country;
            }
        },
        nationality: function nationality(meaningVn) {
            var item = countryNationalityRepository.get.infoByMeaningVN(meaningVn);
            if (item != null && item != typeof (undefined)) {
                return item.nationality;
            }
        }
    }
}