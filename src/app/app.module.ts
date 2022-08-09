import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {CountryComponent} from './country-search/country.component';
import {CountrySearchService} from './services/country-search-service';
import {ShippingCostService} from './services/shipping-cost-service';
import {CountryInformationService} from './services/country-information-service';
import {LetterSendService} from './services/letter-send-service';
import {LetterComponent} from './letter/letter.component';
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
    providers: [CountrySearchService, ShippingCostService, CountryInformationService, LetterSendService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

