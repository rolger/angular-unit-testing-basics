import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Country} from './country';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CountrySearchService {
    apiURL: string = 'https://restcountries.eu/rest/v2/all';

    constructor(private http: HttpClient) {
    }

    public getCountryByCountryCode(countryCode: string): Observable<Country[]> {
        return this.http.get<any[]>(this.apiURL)
            .pipe(
                map(countryArray => {
                    return countryArray
                        .filter(item => item.alpha2Code === countryCode)
                        .map(item => {
                                return new Country(
                                    item.name,
                                    item.alpha2Code,
                                    item.flag,
                                    item.region,
                                    item.regionalBlocs === undefined || item.regionalBlocs.length === 0
                                        ? '' : item.regionalBlocs[0].acronym,
                                    item.latlng[0],
                                    item.latlng[1]
                                );
                            }
                        );
                }));
    }

    public searchCountriesByName(searchString: string): Observable<Country[]> {
        return this.http.get<any[]>(this.apiURL)
            .pipe(
                map(countryArray => {
                    return countryArray
                        .filter(item => item.name.search(searchString) >= 0)
                        .map(item => {
                                return new Country(
                                    item.name,
                                    item.alpha2Code,
                                    item.flag,
                                    item.region,
                                    item.regionalBlocs === undefined || item.regionalBlocs.length === 0 ?
                                        '' : item.regionalBlocs[0].acronym,
                                    item.latlng[0],
                                    item.latlng[1]
                                );
                            }
                        );
                }));
    }
}


