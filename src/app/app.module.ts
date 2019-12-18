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
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule} from '@angular/material';

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule],
    declarations: [CountryComponent, LetterComponent],
    bootstrap: [LetterComponent],
    providers: [CountrySearchService, ShippingCostService, CountryService, LetterSendService]
})
export class AppModule {
}
