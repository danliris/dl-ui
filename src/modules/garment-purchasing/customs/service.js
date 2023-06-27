import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'garment-beacukai';
const deliveryOrderForCustoms = 'garment-delivery-orders/forCustoms';
const deliveryOrderNonPOForCustoms = 'garment-delivery-orders-non-po/forCustoms';
const subconDeliveryOrderForCustoms = 'garment-subcon-delivery-orders/forCustoms';
const serviceUriUnitReceiptNotes = 'garment-delivery-orders/isReceived';
const serviceUriPOMasterDistributions = 'garment-po-master-distributions';

class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
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

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    searchDeliveryOrder(info) {
        var endpoint = `${deliveryOrderForCustoms}`;

        var filter = {
            "supplierId": info.supplier ? info.supplier : "",
            "docurrencycode": info.currency ? info.currency : ""
        };
        var arc = {
            filter: JSON.stringify(filter),
            select: ["doNo", "doDate", "arrivalDate", "items"],
            size: 200,
            billNo: info.billNo || ""
        }
        return super.list(endpoint, arc);
    }

    
    searchDeliveryOrderNonPO(info) {
        var endpoint = `${deliveryOrderNonPOForCustoms}`;

        var filter = {
            "supplierId": info.supplier ? info.supplier : "",
            "docurrencycode": info.currency ? info.currency : ""
        };
        var arc = {
            filter: JSON.stringify(filter),
            select: ["doNo", "doDate", "arrivalDate", "items"],
            size: 200,
            billNo: info.billNo || ""
        }
        return super.list(endpoint, arc);
    }

    searchSubconDeliveryOrder(info) {
        var endpoint = `${subconDeliveryOrderForCustoms}`;

        var filter = {
            "supplierId": info.supplier ? info.supplier : "",
            // "docurrencycode": info.currency ? info.currency : ""
        };
        var arc = {
            filter: JSON.stringify(filter),
            select: ["doNo", "doDate", "arrivalDate", "items"],
            size: 200,
            currencycode: info.currency ? info.currency : ""
        }
        return super.list(endpoint, arc);
    }

    isCreatedOfUnitReceiptNotes(Id) {
        let a = "";
        for (const i of Id) {
            a += `Id=${i}&`;
        }
        var endpoint = `${serviceUriUnitReceiptNotes}?${a}`;
        return super.get(endpoint);
    }

    searchPOMasterDistributions(info) {
        var endpoint = `${serviceUriPOMasterDistributions}`;
        return super.list(endpoint, info);
    }
}

const customsOutUri = 'subcon-customs-outs';
class GarmentService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "garment-production");
    }

    searchCustomsComplete(info) {
        var endpoint = `${customsOutUri}/complete`;
        return super.list(endpoint, info);
    }
}

export { Service, GarmentService }