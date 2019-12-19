import {Component, OnInit} from '@angular/core';

import {Country} from './country';
import {CountrySearchService} from './country-search-service';
import {ShippingCostService} from './shipping-cost-service';


@Component({
    selector: 'app-letter',
    templateUrl: './letter.component.html',
    styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {
    countries: Country [];

    content: string;
    selectedDestination: Country;
    isExpressMode: boolean;

    constructor(private searchService: CountrySearchService, private deliveryService: ShippingCostService) {
        this.countries = [];
    }

    ngOnInit() {
        this.loadCountries();
    }

    loadCountries() {
        this.searchService
            .searchCountriesByName('')
            .subscribe((data) => {
                this.countries = data;
            });
    }

    send() {
        this.deliveryService.calculateCostsAndSend(this.content, this.selectedDestination,
            this.isExpressMode ? 'EXPRESS' : 'Normal');

        this.content = '';
        this.isExpressMode = false;
        this.selectedDestination = null;
    }
}
