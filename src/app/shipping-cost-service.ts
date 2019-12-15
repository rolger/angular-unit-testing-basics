import {Injectable} from "@angular/core";
import {Money} from "./money";
import {CountryService} from "./country-service";


@Injectable()
export class ShippingCostService {
  
  constructor(private countryService: CountryService) {}

     calculate(country: string, options:string) {
        let cost: Money;

        if (this.countryService.isInCommonMarket(country)) {
            // flat rate in EU
            cost = new Money(5);

        } else if (this.countryService.isInAmericas(country)) {
            // US & Canada & South American
            if (options === 'EXPRESS') {
                cost = new Money(40);
            } else {
                cost = new Money(15);
            }

        } else {
            // other countries, e.g. Asia
            let km = this.countryService.distanceTo(country);
            cost = new Money(km).percentage(10);
        }

        return cost;
    }
}
