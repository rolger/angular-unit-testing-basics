import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/toPromise'


class Country {
    constructor(
        public name: string,
        public alpha2Code: string,
        public flag: string,
        public region: string,
        public regionBloc: string,
        public latitude: number,
        public longitude: number
    ) {
    }
}

@Injectable()
export class CountrySearchService {
    apiURL: string = "https://restcountries.eu/rest/v2/all";
    results: Country[];
    loading: boolean;
    homeBase: string = 'AT';

    constructor(private http: HttpClient) {
        this.results = [];
        this.loading = false;
    }

    public isInCommonMarket(countryCode: string) {
        let countryCall = this.getCountryByCountryCode(countryCode);

        countryCall.then(() =>
            this.results.length > 0 &&
            this.results[0].regionBloc === 'EU'
        );
    }

    public isInAmericas(countryCode: string) {
        let countryCall = this.getCountryByCountryCode(countryCode);

        countryCall.then(() =>
            this.results.length > 0 &&
            this.results[0].region === 'Americas'
        );
    }

    public distanceTo(countryCode: string) {
        let austria = this.getCountryByCountryCode(this.homeBase);
        let other = this.getCountryByCountryCode(countryCode);

        Promise.all([austria, other])
        .then(() =>
          distBetween(austria.latitude, austria.longitude,other.latitude, other.longitude);
        );
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

    public getCountryByCountryCode(countryCode: string) {
        let promise = new Promise((resolve, reject) => {
            let wait = setTimeout(() => {
                clearTimeout(wait);

                this.http
                    .get(this.apiURL)
                    .toPromise()
                    .then(
                        (res: any) => {
                            this.results = res
                                .filter(item => item.alpha2Code.search(countryCode) >= 0)
                                .map(item => {
                                    return new Country(
                                        item.name,
                                        item.alpha2Code,
                                        item.flag,
                                        item.region,
                                        item.regionalBlocs === undefined || item.regionalBlocs.length === 0 ? '' : item.regionalBlocs[0].acronym,
                                        item.latlng[0],
                                        item.latlng[1]
                                    );
                                });
                            resolve();
                        },
                        msg => {
                            // Error
                            reject(msg);
                        }
                    );

                resolve();
            }, 1000)
        });
        return promise;
    }

    public searchCountriesByName(searchString: string) {
        let promise = new Promise((resolve, reject) => {
            let wait = setTimeout(() => {
                clearTimeout(wait);

                this.http
                    .get(this.apiURL)
                    .toPromise()
                    .then(
                        (res: any) => {
                            this.results = res
                                .filter(item => item.name.search(searchString) >= 0)
                                .map(item => {
                                    return new Country(
                                        item.name,
                                        item.alpha2Code,
                                        item.flag,
                                        item.region,
                                        item.regionalBlocs === undefined || item.regionalBlocs.length === 0 ? '' : item.regionalBlocs[0].acronym,
                                        item.latlng[0],
                                        item.latlng[1]
                                    );
                                });
                            resolve();
                        },
                        msg => {
                            // Error
                            reject(msg);
                        }
                    );

                resolve();
            }, 1000)
        });
        return promise;
    }
}
