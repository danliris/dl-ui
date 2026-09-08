import { RestService } from "../../../utils/rest-service";

const serviceUri = "finished-good-stocks";

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "garment-production");
  }

  search(info) {
    var endpoint = `${serviceUri}/position`;
    return super.list(endpoint, info);
  }

  generateExcel(args) {
    var endpoint = `${serviceUri}/by-ro/download?&ro=${args.ro}&pallet=${args.pallet}&warehouse=${args.warehouse}&area=${args.area}&line=${args.line}`;
    return super.getXls(endpoint);
  }
}

export { Service };
