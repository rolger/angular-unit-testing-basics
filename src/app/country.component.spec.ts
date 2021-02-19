import {CountryComponent} from './country.component';
import {Country} from './country';
import {CountrySearchService} from './country-search-service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {cold, getTestScheduler} from "jasmine-marbles";

describe('CountryComponent', () => {
    let COUNTRIES;
    let stubCountrySearchService;
    let fixture: ComponentFixture<CountryComponent>;
    let component: CountryComponent;

    beforeEach(() => {
        COUNTRIES = [
            {
                name: 'Austria',
                alpha2Code: 'AT',
                flag: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 0,
                latitude: 0
            } as Country
        ];
        stubCountrySearchService = jasmine.createSpyObj(['searchCountriesByName']);
        TestBed.configureTestingModule({
            declarations: [
                CountryComponent
            ],
            providers: [
                {provide: CountrySearchService, useValue: stubCountrySearchService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(CountryComponent);
        component = fixture.componentInstance;

    });

    describe('doSearch()', () => {

        it('should load countries via search', () => {
            let httpResponse = cold('---c|', {c: COUNTRIES});

            stubCountrySearchService.searchCountriesByName.and.returnValue(httpResponse);
            fixture.detectChanges();

            component.doSearch('');

            getTestScheduler().flush();

            expect(component.countries).toEqual(COUNTRIES);
        });

        it('should should be in state loading false', function () {

        });

    });
});
