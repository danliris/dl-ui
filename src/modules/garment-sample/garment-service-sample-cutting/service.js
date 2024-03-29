import { RestService } from '../../../utils/rest-service';

const serviceUri = 'service-sample-cuttings';
const comodityServiceUri = 'master/garment-comodities';
// const costCalculationServiceUri = 'cost-calculation-garments';
// const hOrderKodeByNoServiceUri = 'local-merchandiser/horders/kode-by-no';
const cuttingInUri = 'garment-sample-cutting-ins';
const uomServiceUri = 'master/uoms';
const sampleRequestUri = 'garment-sample-requests';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    searchComplete(info) {
        var endpoint = `${serviceUri}/complete`;
        return super.list(endpoint, info);
    }

    searchItem(info) {
        var endpoint = `${serviceUri}/item`;
        return super.list(endpoint, info);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    read(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getCuttingIn(info) {
        var endpoint = `${cuttingInUri}/complete`;
        return super.list(endpoint, info);
    }

    getSampleRequest(info) {
        var endpoint = `${sampleRequestUri}`;
        return super.list(endpoint, info);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/get-pdf/${id}`;
        return super.getPdf(endpoint);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/get-pdf/${id}`;
        return super.getPdf(endpoint);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;       
        return super.getXls(endpoint);
    }


}

class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getComodities(info) {
        var endpoint = `${comodityServiceUri}`;
        return super.list(endpoint, info);
    }
    getUom(info) { 
        var endpoint = `${uomServiceUri}`;
        return super.list(endpoint, info);
    }
}

// class SalesService extends RestService {
//     constructor(http, aggregator, config, api) {
//         super(http, aggregator, config, "sales");
//     }

//     getCostCalculationByRONo(info) {
//         var endpoint = `${costCalculationServiceUri}`;
//         return super.list(endpoint, info);
//     }

//     getHOrderKodeByNo(info) {
//         var endpoint = `${hOrderKodeByNoServiceUri}`;
//         return super.list(endpoint, info);
//     }
// }

export { Service, CoreService }