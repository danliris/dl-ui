import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RestService} from '../rest-service';
import {Session} from './session';

@inject(HttpClient, EventAggregator, Session)
export class SecureService extends RestService {
    constructor(http, aggregator, session) {
        super(http, aggregator);
        this.session = session;
        this.header = {
            "Authentication": `JWT ${this.session.token}`
        };
    }
}
