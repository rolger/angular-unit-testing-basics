import {CountryComponent} from './country.component';
import {Country} from './country';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CountrySearchService} from './country-search-service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs/internal/observable/of';
import {Scheduler} from 'rxjs/internal/Rx';
import {scheduled} from 'rxjs/internal/scheduled/scheduled';

describe('CountryComponent', () => {
    let COUNTRIES;
    let stubCountrySearchService;
    let fixture: ComponentFixture<CountryComponent>;
    let component: CountryComponent;

    beforeEach(() => {
        COUNTRIES = [
            new Country('Austria', 'AT', '', 'europe', 'EU', 0, 0)
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
            stubCountrySearchService.searchCountriesByName.and.returnValue(of(COUNTRIES));
            fixture.detectChanges();

            component.doSearch('');

            expect(component.countries).toEqual(COUNTRIES);
        });

        it('should should be in state loading false', fakeAsync(() => {
            stubCountrySearchService.searchCountriesByName.and.returnValue(scheduled(COUNTRIES, Scheduler.async));
            fixture.detectChanges();

            component.doSearch('');
            expect(component.loading).toBe(true);


            tick();
            expect(component.loading).toBe(false);
        }));

    });

});
