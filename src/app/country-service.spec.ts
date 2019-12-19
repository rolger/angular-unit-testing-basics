import {CountryService} from './country-service';
import {CountrySearchService} from './country-search-service';
import {of} from 'rxjs/internal/observable/of';
import {Country} from './country';

describe('CountryService', () => {
    let service: CountryService;
    beforeEach(() => {
        const stubCountrySearchService = jasmine.createSpyObj<CountrySearchService>(['getCountryByCountryCode']);
        stubCountrySearchService.getCountryByCountryCode.and.returnValue(of([new Country('Austria', 'AT', '', 'europe', 'EU', 20, 20)]));
        service = new CountryService(stubCountrySearchService);
    });

    describe('isInCommonMarket()', () => {

        it('should check if the given country is in the EU', () => {
            const austria = new Country('Austria', 'AT', '', 'europe', 'EU', 20, 20);
            expect(service.isInCommonMarket(austria)).toBe(true);
        });
    });
});
