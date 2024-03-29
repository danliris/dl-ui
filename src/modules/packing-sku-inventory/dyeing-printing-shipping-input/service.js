import { RestService } from '../../../utils/rest-service';
const serviceUri = 'dp-input-shipping';
const ccServiceUri = 'sales/finishing-printing-cost-calculations';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getByIdBon(id) {
        var endpoint = `${serviceUri}/bon/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    reject(data) {
        var endpoint = `${serviceUri}/reject`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.delete(endpoint, data);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }

    getProductionOrderOutput(){
        var endpoint = `${serviceUri}/pre-input-shipping`;

        return super.get(endpoint);
    }

    getDeliveryOrderInputv2ById(deliveryOrderSalesId) {
        var endpoint = `${serviceUri}/pre-input-shipping?deliveryOrderSalesId=${deliveryOrderSalesId}`;

        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/xls?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&type=${info.type}`;
        return super.getXls(endpoint);
    }
}