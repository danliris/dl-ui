import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Service {
    constructor(http) {
        this.http = http;
        this.url = "src/json.json";
    }

    getData() {
        return this.http.fetch(this.url);
    }
}