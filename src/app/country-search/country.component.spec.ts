import {CountryComponent} from './country.component';
import {Country} from '../model/country';
import {of} from 'rxjs/internal/observable/of';
import {throwError} from 'rxjs/internal/observable/throwError';

describe('CountryComponent', () => {
    let COUNTRIES;
    let stubCountrySearchService;
    let component: CountryComponent;

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
        stubCountrySearchService = jasmine.createSpyObj(['searchCountriesByName']);

        component = new CountryComponent(stubCountrySearchService);
    });

    describe('doSearch()', () => {
        it('should load countries via search', () => {
            const httpResponse = of(COUNTRIES);
            stubCountrySearchService.searchCountriesByName.and.returnValue(httpResponse);

            component.doSearch('');

            expect(component.countries).toEqual(COUNTRIES);
        });

        it('should save error message from search', () => {
            const httpResponse = throwError(new Error('error occurred'));
            stubCountrySearchService.searchCountriesByName.and.returnValue(httpResponse);

            component.doSearch('');

            expect(component.errorMessage).toEqual('error occurred');
        });
    });

});
