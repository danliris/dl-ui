import { RestService } from "../../../utils/rest-service";

const serviceUri = "finished-good-stocks";
const serviceUriFinOut = 'finishing-outs';

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "garment-production");
  }

  search(info) {
    var endpoint = `${serviceUri}/by-ro-summary`;
    return super.list(endpoint, info);
  }

  getByRONo(RONo) {
    var endpoint = `${serviceUri}/by-ro/${RONo}`;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/racking/${data.Id}`;
    return super.put(endpoint, data);
  }
  // getStelling(id) {
  //   var endpoint = `${serviceUri}/stelling/${id}`;
  //   return super.get(endpoint);
  // }
  // generateExcel(args) {
  //   var endpoint = `${serviceUri}/by-ro/download?productcode=${args.productcode}&ro=${args.ro}&rack=${args.rack}`;
  //   return super.getXls(endpoint);
  // }
  // getPdfById(id) {
  //   var endpoint = `${serviceUri}/stelling/${id}`;
  //   return super.getPdf(endpoint);
  // }
  // getBarcodeById(id) {
  //   var endpoint = `${serviceUri}/barcode/${id}`;
  //   return super.getPdf(endpoint);
  // }

}

export { Service };
