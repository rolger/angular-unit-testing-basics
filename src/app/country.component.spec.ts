import {CountryComponent} from './country.component';
import {Country} from './country';

describe('CountryComponent', () => {
    let COUNTRIES;

    beforeEach(() => {
        COUNTRIES = [
            new Country('Austria', 'AT', '', 'europe', 'EU', 0, 0)
        ];
    });

    it('should load countries via search', function () {

    });

    it('should should be in state loading false', function () {

    });

});
