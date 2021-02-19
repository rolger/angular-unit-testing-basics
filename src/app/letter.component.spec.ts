import {Country} from './country';

describe('LetterComponent', () => {
    let COUNTRIES;

    beforeEach(() => {

        COUNTRIES = [
            {
                name: 'Austria',
                alpha2Code: 'AT',
                flag: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 20,
                latitude: 20
            },
            {
                name: 'Germany',
                alpha2Code: 'DE',
                flag: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 10,
                latitude: 10
            }
        ];
    });

    it('should initialize countries in component', () => {

    });

});
