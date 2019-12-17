import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise'
import {CountrySearchService} from "./country-search-service";
import {Country} from "./country";

@Injectable()
export class CountryService {
    homeBase: string = 'AT';

    constructor(private countryService: CountrySearchService) {
    }

    public async isInCommonMarket(countryCode: string) {
        let countries = await this.countryService.getCountryByCountryCode(countryCode).toPromise();

        return countries.length > 0 && countries[0].regionBloc === 'EU';
    }

    public async isInAmericas(countryCode: string) {
        let countries = await this.countryService.getCountryByCountryCode(countryCode).toPromise();

        return countries.length > 0 && countries[0].region === 'Americas';
    }

    public async distanceTo(countryCode: string) {
        let austria: Country;
        let other: Country;

        await this.countryService.getCountryByCountryCode(this.homeBase).toPromise()
            .then(result => austria = result[0]);
        await this.countryService.getCountryByCountryCode(countryCode).toPromise()
            .then(result => other = result[0]);

        if (austria === undefined || other === undefined) {
            return 0;
        }

        return this.distBetween(austria.latitude, austria.longitude, other.latitude, other.longitude);
    }

    private distBetween(fromLatitude: number, fromLongitude: number, toLatitude: number, toLongitude: number): number {
        let earthRadius: number = 6371000; // meters
        let fLat: number = this.toRadians(fromLatitude);
        let toLat: number = this.toRadians(toLatitude);
        let diffLat: number = this.toRadians(toLatitude - fromLatitude);
        let diffLng: number = this.toRadians(toLongitude - fromLongitude);
        let a: number = Math.sin(diffLat / 2) * Math.sin(diffLat / 2)
            + Math.cos(fLat) * Math.cos(toLat) * Math.sin(diffLng / 2) * Math.sin(diffLng / 2);
        let c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let dist: number = (earthRadius * c);
        return dist;
    }

    private toRadians(value): number {
        return value * Math.PI / 180;
    }
}
