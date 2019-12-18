import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise'
import {CountrySearchService} from "./country-search-service";
import {Country} from "./country";

@Injectable()
export class CountryService {
    homeBase: string = 'AT';
    austria: Country;

    constructor(private countryService: CountrySearchService) {
        countryService.getCountryByCountryCode(this.homeBase)
            .subscribe(countries => this.austria = countries[0]);
    }

    public isInCommonMarket(country: Country) {
        return country.regionBloc === 'EU';
    }

    public isInAmericas(country: Country) {
        return country.region === 'Americas';
    }

    public distanceTo(other: Country) {
        if (this.austria === undefined || other === undefined) {
            return 0;
        }

        return this.distBetween(this.austria.latitude, this.austria.longitude, other.latitude, other.longitude);
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
