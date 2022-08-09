import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {CountrySearchService} from './country-search-service';

// for documentation see https://angular.io/guide/http#testing-http-requests
describe('CountrySearchService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let sut: CountrySearchService;

    const COUNTRIES = [
        {
            name: 'Austria',
            alpha2Code: 'AT',
            flag: 'austrian-flag.jpg',
            region: 'any',
            regionalBlocs: [{acronym: 'tst'}],
            latlng: [0, 1]
        },
        {
            name: 'Germany',
            alpha2Code: 'DE',
            flag: 'german-flag.jpg',
            region: 'any',
            regionalBlocs: [{acronym: 'tst'}],
            latlng: [0, 1]
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CountrySearchService
            ]
        });

        sut = TestBed.inject(CountrySearchService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    describe('getCountryByCountryCode()', () => {

        it('should call a http GET request with empty result', () => {
            sut.getCountryByCountryCode('AT').subscribe(
                countries => expect(countries.length).toEqual(0),
                fail
            );

            const req = httpTestingController.expectOne(sut.apiURL);
            req.flush([]); // Respond with no heroes
        });

        it('should filter the countryCode', () => {
            sut.getCountryByCountryCode('AT').subscribe(
                countries => expect(countries.length).toEqual(1),
                fail
            );

            const req = httpTestingController.expectOne(sut.apiURL);
            req.flush(COUNTRIES);
        });

    });
});
