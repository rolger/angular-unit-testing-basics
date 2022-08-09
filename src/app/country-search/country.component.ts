import {Component} from '@angular/core';

import {Country} from '../model/country';
import {CountrySearchService} from '../services/country-search-service';

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.css']
})
export class CountryComponent {
    loading = false;
    countries: Country [];
    errorMessage: string;

    constructor(private searchService: CountrySearchService) {
        this.countries = [];
    }

    doSearch(searchString: string) {
        this.loading = true;
        this.searchService
            .searchCountriesByName(searchString)
            .subscribe(
                data => {
                    this.countries = data;
                    this.errorMessage = '';
                    this.loading = false;
                },
                error => {
                    this.countries = [];
                    this.errorMessage = error.message;
                    this.loading = false;
                });
    }

    doSearchAsync(searchString: string) {
        this.loading = true;

        return new Promise((resolve) => {
            let result;
            this.searchService
                .searchCountriesByName(searchString)
                .subscribe(
                    data => {
                        result = data;
                    },
                    error => {
                        result = [];
                    });
            resolve(result);
        })
            .then((data: Country[]) => {
                this.countries = data;
                this.loading = false;
            });
    }
}
