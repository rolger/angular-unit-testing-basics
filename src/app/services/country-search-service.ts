import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Country, RestCountry} from '../model/country';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class CountrySearchService {
    apiURL: string = 'https://restcountries.eu/rest/v2/all';

    constructor(private http: HttpClient) {
    }

    public getCountryByCountryCode(countryCode: string): Observable<Country[]> {
        return this.http.get<RestCountry[]>(this.apiURL)
            .pipe(
                map(countryArray => {
                    return countryArray
                        .filter(item => item.alpha2Code === countryCode)
                        .map(item => {
                                return {
                                    name: item.name,
                                    alpha2Code: item.alpha2Code,
                                    flag: item.flagUrl,
                                    region: item.region,
                                    regionBloc: item.regionalBlocs === undefined || item.regionalBlocs.length === 0 ? '' : item.regionalBlocs[0].acronym,
                                    latitude: item.latlng[0],
                                    longitude: item.latlng[1]
                                };
                            }
                        );
                })
            );
    }

    public searchCountriesByName(searchString: string): Observable<Country[]> {
        return this.http.get<RestCountry[]>(this.apiURL)
            .pipe(
                tap(c => console.log("loading " + c.length + " elements via http.")),
                map(countryArray => {
                    return countryArray
                        .filter(item => item.name.search(searchString) >= 0)
                        .map(item => {
                            return {
                                name: item.name,
                                alpha2Code: item.alpha2Code,
                                flag: item.flagUrl,
                                region: item.region,
                                regionBloc: item.regionalBlocs === undefined || item.regionalBlocs.length === 0 ? '' : item.regionalBlocs[0].acronym,
                                latitude: item.latlng[0],
                                longitude: item.latlng[1]
                            };
                        });
                })
            );
    }
}


