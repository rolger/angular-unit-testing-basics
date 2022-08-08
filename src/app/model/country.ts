export interface Country {
    name: string;
    alpha2Code: string;
    flag: string;
    region: string;
    regionBloc: string;
    latitude: number;
    longitude: number;
}

export interface RestRegionalBlocs {
    acronym: string;
    name: string;
}

export interface RestCountry {
    name: string;
    alpha2Code: string;
    capital?: string;
    region: string;
    subregion: string;
    flagUrl: string;
    regionBloc: string;
    latlng: number[];
    regionalBlocs?: RestRegionalBlocs[];
}