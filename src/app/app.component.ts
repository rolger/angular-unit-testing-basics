import { Component } from '@angular/core';

import {CountrySearchService} from './CountrySearchService'


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  private loading: boolean = false;

  constructor(private countries: CountrySearchService) {}

  doSearch(searchString:string) {
    this.loading = true;
    this.countries
      .searchCountriesByName(searchString)
      .then(() => (this.loading = false));
  }
}
