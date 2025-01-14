var countryNationalityService = {
    get: {
        vocabulary: {
            country: function country(meaningVn) {
                return countryNationalityRepository.get.country(meaningVn);
            },
            nationality: function nationality(meaningVn) {
                return countryNationalityRepository.get.nationality(meaningVn);
            }
        },
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