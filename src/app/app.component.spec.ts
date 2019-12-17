import {ComponentFixture, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {CountrySearchService} from "./country-search-service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import { inject } from '@angular/core/testing';

describe("Testing my-app", () => {
    let fixture: ComponentFixture<AppComponent>;
    let mockedService;

    beforeEach(() => {
        mockedService = jasmine.createSpyObj(['searchCountriesByName']);

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                {provide: CountrySearchService, useValue: mockedService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
    });

    it('should run', function () {
        //expect(true).toBe(true);
    });


});