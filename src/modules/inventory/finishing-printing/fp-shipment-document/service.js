import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = "inventory/fp-shipment-document";
const inventoryServiceUri = "inventory/inventory-summary";
const productServiceUri = "master/product";

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory");
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

    searchProducts(info) {
        var endpoint = `${productServiceUri}`;
        return super.list(endpoint, info);
    }

    searchInventory(info) {
        var endpoint = `${inventoryServiceUri}`;
        return super.list(endpoint, info);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    searchPackingReceipts(info) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("production");
        var _serviceUri = `inventory/packing-receipts`;

        return _endpoint.find(_serviceUri, info)
            .then(result => {
                return result.data;
            });
    }

    searchInventorySummaries(info) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("inventory");
        var _serviceUri = `inventory/inventory-summary`;

        return _endpoint.find(_serviceUri, info)
            .then(result => {
                return result.data;
            });
    }

    searchProducts(info) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/products`;

        return _endpoint.find(_serviceUri, info)
            .then(result => {
                return result.data;
            });
    }

    getBuyerById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/buyers/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getProductionOrderById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("production");
        var _serviceUri = `sales/production-orders/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

}