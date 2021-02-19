import {CountryComponent} from './country.component';
import {Country} from './country';

describe('CountryComponent', () => {
    let COUNTRIES;

    beforeEach(() => {
        COUNTRIES = [
            {
                name: 'Austria',
                alpha2Code: 'AT',
                flag: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 0,
                latitude: 0
            } as Country
        ];
    });

    it('should load countries via search', function () {

    });

    it('should should be in state loading false', function () {

    });

});
