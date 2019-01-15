import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'purchasing-disposition-acceptance';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    delete(data) {
        let endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }
}
