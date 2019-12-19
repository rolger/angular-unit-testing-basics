import {TestBed} from '@angular/core/testing';
import {CountrySearchService} from './country-search-service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('Testing CountrySearchService', () => {
    let service: CountrySearchService;
    let httpTestingController: HttpTestingController;
    let COUNTRIES;

    beforeEach(() => {
        COUNTRIES = [
            {
                name: 'Austria',
                alpha2Code: 'AT',
                flag: 'austrian-flag.jpg',
                region: 'any',
                regionalBlocs: [{acronym: 'tst'}],
                latlng: [0, 1]
            },
            {
                name: 'GErmany',
                alpha2Code: 'DE',
                flag: 'austrian-flag.jpg',
                region: 'any',
                regionalBlocs: [{acronym: 'tst'}],
                latlng: [0, 1]
            }
        ];

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CountrySearchService
            ]
        });
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(CountrySearchService);
    });


    it('should call a http GET request', () => {
        service.getCountryByCountryCode('AT').subscribe(
            (c) => {
                expect(c.length).toBe(0);
            });
        const req = httpTestingController.expectOne('https://restcountries.eu/rest/v2/all');
        req.flush([]);

    });

    it('should filter the countryCode', () => {
        service.getCountryByCountryCode('').subscribe(
            (c) => {
                console.log(c);
                expect(c.length).toBe(1);
            }
        );

        const req = httpTestingController.expectOne('https://restcountries.eu/rest/v2/all');
        req.flush(COUNTRIES);
    });
})
;
