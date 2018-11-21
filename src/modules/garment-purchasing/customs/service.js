import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'garment-beacukai';
const deliveryOrderForCustoms = 'garment-delivery-orders/forCustoms';
const serviceUriUnitReceiptNotes = 'garment-delivery-orders/isReceived';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config,  "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        console.log(endpoint);
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

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    searchDeliveryOrder(info) {
        var endpoint = `${deliveryOrderForCustoms}`;
        
        var filter = {
                    "suppliercode" : info.supplier ? info.supplier : "",
                     "docurrencycode" : info.currency ? info.currency : ""
                    };
        var arc = {
                filter : JSON.stringify(filter),
                select : ["doNo","doDate","arrivalDate","items"],
                size: 200
            }
        return super.list(endpoint, arc);
    }
   
    isCreatedOfUnitReceiptNotes(Id) {
        let a = "";
        for (const i of Id) {
            a += `Id=${i}&`;
        }
        var endpoint = `${serviceUriUnitReceiptNotes}?${a}`;
        console.log(Id);
        return super.get(endpoint);
    }
}