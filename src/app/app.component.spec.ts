import {ComponentFixture, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {CountrySearchService} from "./country-search-service";


describe("Testing my-app", () => {
    let fixture: ComponentFixture<AppComponent>;
    let mockedService;

    beforeEach(() => {
        mockedService = jasmine.createSpyObj(['searchCountriesByName']);
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [{provide: CountrySearchService, useValue: mockedService}]
        });
        fixture = TestBed.createComponent(AppComponent);
    });

    it('should run', function () {
        expect(true).toBe(true);
    });


});