import {Country} from '../model/country';
import {Money} from '../model/money';
import { Injectable } from "@angular/core";

@Injectable()
export class LetterSendService {

    sendTo(destination: Country, content: string, cost: Money) {

    }
}
