import {Country} from './country';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LetterComponent} from './letter.component';
import {ShippingCostService} from './shipping-cost-service';
import {CountrySearchService} from './country-search-service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs/internal/observable/of';

describe('LetterComponent', () => {
    let COUNTRIES;

    let stubCountrySearchService: jasmine.SpyObj<CountrySearchService>;
    let mockShippingCostService: ShippingCostService;
    let fixture: ComponentFixture<LetterComponent>;
    let component: LetterComponent;

    beforeEach(() => {
        COUNTRIES = [
            new Country('Austria', 'AT', '', 'europe', 'EU', 20, 20),
            new Country('Germany', 'DE', '', 'europe', 'EU', 10, 10)
        ];
        stubCountrySearchService = jasmine.createSpyObj(['searchCountriesByName']);
        TestBed.configureTestingModule({
            declarations: [
                LetterComponent
            ],
            providers: [
                {provide: CountrySearchService, useValue: stubCountrySearchService},
                {provide: ShippingCostService, useValue: mockShippingCostService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(LetterComponent);
        component = fixture.componentInstance;
    });

    it('should initialize countries in component', () => {
        stubCountrySearchService.searchCountriesByName.and.returnValue(of(COUNTRIES));
        fixture.detectChanges();

        expect(component.countries).toEqual(COUNTRIES);
    });

});
