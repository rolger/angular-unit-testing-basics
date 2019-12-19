import {Country} from './country';

describe('Testing LetterComponent', () => {
    let COUNTRIES;

    beforeEach(() => {
        COUNTRIES = [
            new Country('Austria', 'AT', '', 'europe', 'EU', 20, 20),
            new Country('Germany', 'DE', '', 'europe', 'EU', 10, 10)
        ];
    });

    it('should initialize countries in component', () => {

    });

});
