import {Country} from './country';

describe('CountrySearchService', () => {
    let COUNTRIES;

    beforeEach(() => {
        COUNTRIES = [
            new Country('Austria', 'AT', '', 'europe', 'EU', 20, 20),
            new Country('Germany', 'DE', '', 'europe', 'EU', 10, 10)
        ];
    });

    describe('getCountryByCountryCode()', () => {

        it('should call a http GET request with empty result', () => {

        });

        it('should filter the countryCode', () => {

        });

    });
});
