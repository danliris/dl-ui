import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'sewing-blocking-plans';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-master-plan");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    getBookingById(id) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-master-plan");
        var _serviceUri = `booking-orders/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getWeeklyPlan(filter){
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-master-plan");
        var _serviceUri = `weekly-plans`;

        return _endpoint.find(_serviceUri, { filter: JSON.stringify(filter), order: JSON.stringify({"unit.code":1}) })
            .then(result => {
                return result.data;
            });
    }

    getWeek(filter){
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-master-plan");
        var _serviceUri = `weekly-plans-by-year`;

        return _endpoint.find(_serviceUri, { filter: JSON.stringify(filter) })
            .then(result => {
                return result.data;
            });
    }

    getWorkingHour(){
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-master-plan");
        var _serviceUri = `working-hours-standards`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    // getPreview(year){
    //     var config = Container.instance.get(Config);
    //     var _endpoint = config.getEndpoint("garment-master-plan");
    //     var _serviceUri = `sewing-blocking-plan-previews`;

    //     return _endpoint.find(_serviceUri, {  year: year })
    //         .then(result => {
    //             return result.data;
    //         });
    // }
}