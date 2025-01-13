var countryNationalityService = {
    get: {
        answer: {
            country: function country(meaningVn) {
                return "I am from " + countryNationalityRepository.get.country(meaningVn).toLowerCase();
            },
            nationality: function nationality(meaningVn) {
                return "I am " + countryNationalityRepository.get.nationality(meaningVn).toLowerCase();
            }
        }
    }
}