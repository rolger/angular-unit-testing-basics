import { NgModule, Component, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise'


class Country {
  constructor(
    public name: string,
    public alpha2Code: string,
    public flag: string,
    public region: string,
    public regionBloc: string
  ) {}
}

@Injectable()
export class CountrySearchService {
  apiURL: string = "https://restcountries.eu/rest/v2/all";
  results: Country[];
  loading: boolean;

  constructor(private http: HttpClient) {
    this.results = [];
    this.loading = false;
  }

  search(searchString: string) {
    let promise = new Promise((resolve, reject) => {
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
                item.regionalBlocs === undefined  || item.regionalBlocs.length === 0 ? '' :  item.regionalBlocs[0].acronym
              );
            });
            resolve();
          },
          msg => {
            // Error
            reject(msg);
          }
        );
    });
    return promise;
  }
}