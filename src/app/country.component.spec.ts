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

    describe('doSearch()', () => {

        it('should load countries via search', () => {
        });

    });

    describe('doSearchAsync()', () => {

        it('should switch loading state', function () {
        });

    });

});
