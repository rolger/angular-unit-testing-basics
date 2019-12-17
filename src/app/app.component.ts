import {Component} from '@angular/core';

import {Country} from "./country";
import {CountrySearchService} from "./country-search-service";


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    loading: boolean = false;
    countries: Country [];

    constructor(private searchService: CountrySearchService) {
        this.countries = [];
    }

    doSearch(searchString: string) {
        this.loading = true;
        this.searchService
            .searchCountriesByName(searchString)
            .subscribe((data) => {
              this.countries = data;
              this.loading = false;
            });
    }
}
