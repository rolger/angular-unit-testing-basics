import {CountryComponent} from './country.component';
import {CountrySearchService} from './country-search-service';
import {of} from 'rxjs';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Country} from './country';

describe('Testing CountryComponent', () => {
    let COUNTRIES;

    beforeEach(() => {
        COUNTRIES = [
            new Country('Austria', 'AT', '', 'europe', 'EU', 0, 0)
        ];
    });

    it('should load countries via search', function () {

    });

    it('should should be in state loading false', function () {

    });

});
