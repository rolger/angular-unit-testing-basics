import {CountryComponent} from './country.component';
import {Country} from '../model/country';
import {CountrySearchService} from '../services/country-search-service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs/internal/observable/of';
import {throwError} from 'rxjs/internal/observable/throwError';

describe('CountryComponent with Angular TestBed', () => {
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
        const element = fixture.nativeElement;      // to access DOM element
    });

    describe('doSearch()', () => {
        it('should load countries via search', () => {
            const httpResponse = of(COUNTRIES);
            stubCountrySearchService.searchCountriesByName.and.returnValue(httpResponse);

            component.doSearch('');

            expect(component.countries).toEqual(COUNTRIES);
        });

        it('should save error message from search', () => {
            const httpResponse = throwError(new Error('error occurred'));
            stubCountrySearchService.searchCountriesByName.and.returnValue(httpResponse);

            component.doSearch('');

            expect(component.errorMessage).toEqual('error occurred');
        });
    });

    describe('doSearchAsync()', () => {
        it('should switch loading state', function () {
            const httpResponse = of(COUNTRIES);
            stubCountrySearchService.searchCountriesByName.and.returnValue(httpResponse);

            fixture.detectChanges();
            const debugElement = fixture.debugElement;
            let q = debugElement.query(By.css('.text-center'));
            expect(debugElement.query(By.css('.text-center')).nativeElement.innerText).toBe('');

            component.doSearchAsync('');

            fixture.detectChanges();

            q = debugElement.query(By.css('.text-center'));
            expect(debugElement.query(By.css('.text-center')).nativeElement.innerText).toBe('Loading...');
            expect(component.loading).toEqual(true);

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(debugElement.query(By.css('.text-center')).nativeElement.innerText).toBe('');
            });
        });

    });

});
