import { RestService } from '../../../utils/rest-service';

const serviceUri = "stock-opname-summary";

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}/update-track`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
      }
    
    update(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.put(endpoint, data);
    }
    getStelling(id) {
        var endpoint = `${serviceUri}/stelling/${id}`;
        return super.get(endpoint);
      }
    generateExcel(args) {
        var endpoint = `${serviceUri}/by-po/download?productcode=${args.productcode}&po=${args.po}&unitcode=${args.unitcode}`;
        return super.getXls(endpoint);
    }
    getPdfById(id) {
        var endpoint = `${serviceUri}/stelling/${id}`;
        return super.getPdf(endpoint);
    }


}

export { Service }