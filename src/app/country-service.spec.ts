import {CountryService} from './country-service';
import {CountrySearchService} from './country-search-service';
import {of} from 'rxjs/internal/observable/of';
import {Country} from './country';

describe('CountryService', () => {
    let COUNTRIES;
    let service: CountryService;

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
        const stubCountrySearchService = jasmine.createSpyObj<CountrySearchService>(['getCountryByCountryCode']);
        stubCountrySearchService.getCountryByCountryCode.and.returnValue(of(COUNTRIES));

        service = new CountryService(stubCountrySearchService);
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

            expect(service.isInCommonMarket(austria)).toBe(true);
        });
    });
});
