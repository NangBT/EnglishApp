var countryNationalityService = {
    getCountry: function getCountry(meaningVn) {
        var item = countryNationalityTbl.find(e => e.meaningVN === meaningVn);
        if (item != null && item != typeof (undefined)) {
            return item.country;
        }
    },
    getNationality: function getNationality(meaningVn) {
        var item = countryNationalityTbl.find(e => e.meaningVN == meaningVn);
        if (item != null && item != typeof (undefined)) {
            return item.nationality;
        }
    }
}