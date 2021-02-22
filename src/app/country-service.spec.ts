import {CountryService} from './country-service';
import {Country} from './country';

describe('CountryService', () => {
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

    describe('isInCommonMarket()', () => {

        it('should check if the given country is in the EU', () => {
            const austria = {
                name: 'Austria',
                alpha2Code: 'AT',
                flag: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 0,
                latitude: 0
            } as Country;

        });
    });
});
