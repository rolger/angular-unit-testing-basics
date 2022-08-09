import {CountryComponent} from './country.component';
import {Country} from '../model/country';
import {CountrySearchService} from '../services/country-search-service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {cold, getTestScheduler} from "jasmine-marbles";
import {By} from "@angular/platform-browser";
import {of} from "rxjs/internal/observable/of";

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
                flagUrl: '',
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
        let element = fixture.nativeElement;      // to access DOM element
    });

    describe('doSearch()', () => {

        it('should load countries via search with marbles', () => {
            let httpResponse = cold('---c|', {c: COUNTRIES});
            stubCountrySearchService.searchCountriesByName.and.returnValue(httpResponse);

            component.doSearch('');

            getTestScheduler().flush();

            expect(component.countries).toEqual(COUNTRIES);
        });

        it('should load countries via search', () => {
            let httpResponse = of(COUNTRIES);
            stubCountrySearchService.searchCountriesByName.and.returnValue(httpResponse);

            component.doSearch('');

            expect(component.countries).toEqual(COUNTRIES);
        });

    });

    describe('doSearchAsync()', () => {
        it('should switch loading state', function () {
            let httpResponse = of(COUNTRIES);
            stubCountrySearchService.searchCountriesByName.and.returnValue(httpResponse);

            fixture.detectChanges();
            let debugElement = fixture.debugElement;
            let q = debugElement.query(By.css('.text-center'));
            expect(debugElement.query(By.css('.text-center')).nativeElement.innerText).toBe("");

            component.doSearchAsync('');

            fixture.detectChanges();

            q = debugElement.query(By.css('.text-center'));
            expect(debugElement.query(By.css('.text-center')).nativeElement.innerText).toBe('Loading...');
            expect(component.loading).toEqual(true);

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(debugElement.query(By.css('.text-center')).nativeElement.innerText).toBe("");
            });
        });

    });

});
