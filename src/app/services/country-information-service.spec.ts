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
            }
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
                region: 'europe',
                regionBloc: 'EU'
            } as Country;

            expect(service.isInCommonMarket(austria)).toBe(true);
        });
    });

    describe('isInAmericas()', () => {
        it('should check if the given country is not in America', () => {
            const austria = {
                name: 'Austria',
                alpha2Code: 'AT',
                region: 'europe',
                regionBloc: 'EU'
            } as Country;

            expect(service.isInAmericas(austria)).toBe(false);
        });

        it('should check if the given country is in America', () => {
            const usa = {
                name: 'United States of America',
                alpha2Code: 'US',
                region: 'Americas'
            } as Country;

            expect(service.isInAmericas(usa)).toBe(true);
        });
    });

    describe('isInCommonMarket()', () => {
        it('should check if the given country is in the EU', () => {
            const germany = {
                name: 'Germany',
                alpha2Code: 'DE',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 10,
                latitude: 10
            } as Country;

            expect(service.distanceTo(germany)).toEqual(1568520.556798576);
        });
    });

});
