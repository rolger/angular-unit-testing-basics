import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CountrySearchService} from "./country-search-service";

@Injectable()
export class CountryService {
    homeBase: string = 'AT';

    constructor(private countryService: CountrySearchService) {
    }

    public isInCommonMarket(countryCode: string) {
        let countryCall = this.countryService.getCountryByCountryCode(countryCode);

        return countryCall.subscribe(
          pipe(
            map(countries => {
              return countries.length > 0 && countries[0].regionBloc === 'EU';
            })
          )
        );
    }

    public isInAmericas(countryCode: string) {
        let countryCall = this.countryService.getCountryByCountryCode(countryCode);

        countryCall.subscribe(countries =>
            countries.length > 0 && countries[0].region === 'Americas'
        );
        return false;
    }

    public distanceTo(countryCode: string): number {
        return 10;
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
