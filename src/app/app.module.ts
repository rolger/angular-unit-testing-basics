import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {CountryComponent} from './country.component';
import {CountrySearchService} from './country-search-service';
import {ShippingCostService} from './shipping-cost-service';
import {CountryService} from './country-service';
import {LetterSendService} from './letter-send-service';
import {LetterComponent} from './letter.component';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule],
    declarations: [CountryComponent, LetterComponent],
    bootstrap: [LetterComponent],
    providers: [CountrySearchService, ShippingCostService, CountryService, LetterSendService]
})
export class AppModule {
}
