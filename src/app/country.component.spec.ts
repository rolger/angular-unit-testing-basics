import {CountryComponent} from './country.component';
import {CountrySearchService} from './country-search-service';
import {of} from 'rxjs';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Country} from './country';

describe('Testing CountryComponent', () => {
    let fixture: ComponentFixture<CountryComponent>;
    let component: CountryComponent;
    let mockedService;
    let COUNTRIES;

    beforeEach(() => {
        COUNTRIES = [new Country('Austria', 'AT', '', 'europe', 'EU', 0, 0)];

        mockedService = jasmine.createSpyObj(['searchCountriesByName']);

        TestBed.configureTestingModule({
            declarations: [CountryComponent],
            providers: [
                {provide: CountrySearchService, useValue: mockedService}
            ]
        });

        fixture = TestBed.createComponent(CountryComponent);
        component = fixture.componentInstance;
    });

    it('should load countries via search', function () {
        mockedService.searchCountriesByName.and.returnValues(of(COUNTRIES));

        component.doSearch('');

        expect(component.countries.length).toEqual(1);
    });

    it('should should be in state loading false', function () {
        mockedService.searchCountriesByName.and.returnValues(of(COUNTRIES));

        component.doSearch('');

        expect(component.loading).toEqual(false);
    });

});
