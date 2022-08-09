import {CountryInformationService} from './country-information-service';
import {CountrySearchService} from './country-search-service';
import {of} from 'rxjs/internal/observable/of';
import {Country} from '../model/country';

describe('CountryService', () => {
    let COUNTRIES;
    let service: CountryInformationService;

    beforeEach(() => {
        COUNTRIES = [
            {
                name: 'Austria',
                alpha2Code: 'AT',
                flagUrl: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 0,
                latitude: 0
            } as Country
        ];
        const stubCountrySearchService = jasmine.createSpyObj<CountrySearchService>(['getCountryByCountryCode']);
        stubCountrySearchService.getCountryByCountryCode.and.returnValue(of(COUNTRIES));

        service = new CountryInformationService(stubCountrySearchService);
    });

    describe('isInCommonMarket()', () => {

        it('should check if the given country is in the EU', () => {
            const austria = {
                name: 'Austria',
                alpha2Code: 'AT',
                flagUrl: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 0,
                latitude: 0
            } as Country;

            expect(service.isInCommonMarket(austria)).toBe(true);
        });
    });
});
