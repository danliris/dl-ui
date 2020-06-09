import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'merchandiser/garment-sales-contracts';

class SalesService extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getbyRO(ro) {
        var endpoint = `${serviceUri}/by/${ro}`;
        return super.get(endpoint);
    }

};

export { SalesService }
