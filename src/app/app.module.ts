import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.moduls';

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AngularMaterialModule
    ],
    declarations: [
        AppComponent,
        CountryComponent,
        LetterComponent
    ],
    bootstrap: [AppComponent],
    providers: [CountrySearchService, ShippingCostService, CountryService, LetterSendService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

