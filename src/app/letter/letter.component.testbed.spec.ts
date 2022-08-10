import {CountrySearchService} from '../services/country-search-service';
import {ShippingCostService} from '../services/shipping-cost-service';
import {LetterComponent} from './letter.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
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
            {
                name: 'Austria',
                alpha2Code: 'AT',
                flag: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 20,
                latitude: 20
            },
            {
                name: 'Germany',
                alpha2Code: 'DE',
                flag: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 10,
                latitude: 10
            }
        ];

        stubCountrySearchService = jasmine.createSpyObj(['searchCountriesByName']);
        mockShippingCostService = jasmine.createSpyObj(['calculateCostsAndSend']);
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

    describe('ngOnInit', () => {
        it('should initialize countries in component', () => {
            stubCountrySearchService.searchCountriesByName.and.returnValue(of(COUNTRIES));
            fixture.detectChanges();

            expect(component.countries).toEqual(COUNTRIES);
        });
    });

    describe('send', () => {

        it('should provide a error message when content is missing', () => {
            stubCountrySearchService.searchCountriesByName.and.returnValue(of(COUNTRIES));
            fixture.detectChanges();

            component.send();

            expect(component.message.text).toEqual('You must enter a text.');
        });

        it('should provide a error message when destination is missing', () => {
            stubCountrySearchService.searchCountriesByName.and.returnValue(of(COUNTRIES));
            fixture.detectChanges();

            component.content = 'abc';
            component.send();

            expect(component.message.text).toEqual('You must select a destination.');
        });

        it('should provide a message when successful', () => {
            stubCountrySearchService.searchCountriesByName.and.returnValue(of(COUNTRIES));
            fixture.detectChanges();

            component.content = 'abc';
            component.selectedDestination = COUNTRIES[0];
            component.send();

            expect(component.message.text).toEqual('Your letter has been sent.');
        });

        it('should call the service when successful', () => {
            stubCountrySearchService.searchCountriesByName.and.returnValue(of(COUNTRIES));
            fixture.detectChanges();

            component.content = 'abc';
            component.selectedDestination = COUNTRIES[0];
            component.send();

            expect(mockShippingCostService.calculateCostsAndSend).toHaveBeenCalledWith('abc', jasmine.anything(), 'Normal');
        });
    });

});
