import {Country} from '../model/country';
import {ShippingCostService} from './shipping-cost-service';
import {CountryService} from "./country-service";
import {LetterSendService} from "./letter-send-service";
import {TestBed} from "@angular/core/testing";
import {Money} from "../model/money";
import anything = jasmine.anything;

// documentation https://angular.io/guide/testing-services#testing-services
describe('ShippingCostService wtih TestBed', () => {
    let stubCountryService: jasmine.SpyObj<CountryService>;
    let mockSendService: jasmine.SpyObj<LetterSendService>;
    let service: ShippingCostService;

    beforeEach(() => {
        stubCountryService = jasmine.createSpyObj(['isInCommonMarket', 'isInAmericas', 'distanceTo']);
        mockSendService = jasmine.createSpyObj<LetterSendService>(['sendTo']);

        TestBed.configureTestingModule({
            providers: [
                ShippingCostService,
                {provide: CountryService, useValue: stubCountryService},
                {provide: LetterSendService, useValue: mockSendService}
            ]
        });

        service = TestBed.inject(ShippingCostService);
    });

    it('should calculate costs for common market', () => {
        stubCountryService.isInCommonMarket.and.returnValue(true);

        service.calculateCostsAndSend('', 'mockCountry' as unknown as Country, '');

        expect(mockSendService.sendTo).toHaveBeenCalledWith(anything(), anything(), new Money(5));
    });

});
