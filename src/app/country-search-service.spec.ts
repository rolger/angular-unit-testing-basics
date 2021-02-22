import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from "@angular/common/http";
import {CountrySearchService} from "./country-search-service";

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
        // create the service with TestBed and retrieve HttpClient & HttpTestingController

    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    describe('getCountryByCountryCode()', () => {

        it('should call a http GET request with empty result', () => {

        });

        it('should filter the countryCode', () => {

        });

    });
});
