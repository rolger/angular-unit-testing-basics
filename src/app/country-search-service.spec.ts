import {TestBed} from '@angular/core/testing';
import {CountrySearchService} from './country-search-service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Country} from './country';

describe('Testing CountrySearchService', () => {
    let service: CountrySearchService;
    let httpTestingController: HttpTestingController;
    let COUNTRIES;

    beforeEach(() => {
        COUNTRIES = [
            new Country('Austria', 'AT', 'a.jpg', 'europe', 'EU', 100, 90),
            new Country('Germany', 'DE', 'd.jpg', 'europe', 'EU', 10, 80)
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

    it('should filter the countryCode', (done) => {
        service.getCountryByCountryCode('AT').subscribe(
            (c) => {
                console.log(c);
                expect(c.length).toBe(90);
                done;
            }
        );

        const req = httpTestingController.expectOne('https://restcountries.eu/rest/v2/all');
        req.flush(COUNTRIES);
        //req.flush('[{"name": "austria", "alpha2Code": "AT"}]');
    });
})
;
