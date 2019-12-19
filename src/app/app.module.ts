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
import {AppComponent} from './app.component';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatCardModule],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatCardModule],
    declarations: [
        AppComponent,
        CountryComponent,
        LetterComponent
    ],
    bootstrap: [AppComponent],
    providers: [CountrySearchService, ShippingCostService, CountryService, LetterSendService]
})
export class AppModule {
}
