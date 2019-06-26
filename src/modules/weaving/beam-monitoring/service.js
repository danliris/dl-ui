import { RestService } from "../../../utils/rest-service";

const serviceUri = "weaving/movements/beam";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint);
  }

  getById(Id, number) {
    var endpoint = `${serviceUri}/${Id}/beam-number/${number}`;
    return super.get(endpoint);
  }
}
