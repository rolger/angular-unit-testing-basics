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

    message: any;

    constructor(private searchService: CountrySearchService, private deliveryService: ShippingCostService) {
        this.countries = [];
        this.selectedDestination = null;
        this.content = '';
        this.isExpressMode = false;
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
        if (this.content == '') {
            this.message = { type: 'error', text: 'You must enter a text.' };
            return;
        }
        if (this.selectedDestination == null) {
            this.message = { type: 'error', text: 'You must select a destination.' };
            return;
        }

        this.deliveryService.calculateCostsAndSend(this.content, this.selectedDestination,
            this.isExpressMode ? 'EXPRESS' : 'Normal');

        this.message = { type: 'success', text: 'Your letter has been sent.' };
        this.content = '';
        this.isExpressMode = false;
        this.selectedDestination = null;

        setTimeout (() => {
            this.message = undefined;
        }, 2000);
    }
}
