import {TestBed} from '@angular/core/testing';
import {StartComponent} from './start.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                StartComponent
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(StartComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have a title 'Unit Testing'`, () => {
        const fixture = TestBed.createComponent(StartComponent);
        const app = fixture.componentInstance;
        expect(app.pageTitle).toContain('Unit Testing');
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(StartComponent);
        fixture.detectChanges();
        const htmlElement = fixture.nativeElement as HTMLElement;
        expect(htmlElement.innerText).toContain('Unit Testing');
    });
});
