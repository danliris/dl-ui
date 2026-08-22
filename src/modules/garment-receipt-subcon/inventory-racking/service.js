import { RestService } from "../../../utils/rest-service";

const serviceUri = "subcon-inventory-racking";

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  search(info) {
    var endpoint = `${serviceUri}/by-po`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }
  getStelling(id) {
    var endpoint = `${serviceUri}/stelling/${id}`;
    return super.get(endpoint);
  }
  generateExcel(args) {
    var endpoint = `${serviceUri}/by-po/download?productcode=${args.productcode}&po=${args.po}&rack=${args.rack}`;
    return super.getXls(endpoint);
  }
  getPdfById(id) {
    var endpoint = `${serviceUri}/stelling/${id}`;
    return super.getPdf(endpoint);
  }
  getBarcodeById(id) {
    var endpoint = `${serviceUri}/barcode/${id}`;
    return super.getPdf(endpoint);
  }
}

export { Service };
