const countryNationalityService = {
    get: {
        vocabulary: {
            country(meaningVn) {
                return countryNationalityRepository.get.country(meaningVn);
            },
            nationality(meaningVn) {
                return countryNationalityRepository.get.nationality(meaningVn);
            }
        },
        answer: {
            country(meaningVn) {
                return "I am from " + countryNationalityRepository.get.country(meaningVn).toLowerCase();
            },
            nationality(meaningVn) {
                return "I am " + countryNationalityRepository.get.nationality(meaningVn).toLowerCase();
            }
        }
    }
}