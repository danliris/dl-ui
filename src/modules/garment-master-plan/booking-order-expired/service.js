import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'booking-orders';
const serviceUriBookingOrderExpired = 'booking-orders-expired';
const HourServiceUri = 'standard-hours-by-style';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-master-plan");
    }

    search(info) {
        var endpoint = `${serviceUriBookingOrderExpired}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getStandardHourByStyle(styleCode) {
        var endpoint = `${HourServiceUri}?styleCode=${styleCode}`;
        return super.get(endpoint);
    }

    getBuyerById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/garment-buyers/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getSectionById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-master-plan");
        var _serviceUri = `garment-sections/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getStyleById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-master-plan");
        var _serviceUri = `styles/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getWeekById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-master-plan");
        var _serviceUri = `weekly-plans/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getMasterPlanByBookingOrderNo(no) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-master-plan");
        var _serviceUri = `sewing-blocking-plans-by-booking-order/${no}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    deleteRemaining(data) {
        var endpoint = `${serviceUriBookingOrderExpired}/delete-all`;
        return super.post(endpoint, data);
    }
}
