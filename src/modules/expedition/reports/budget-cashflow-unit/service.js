import { RestService } from "../../../../utils/rest-service";

const serviceUri = "aaa/bbb";

export class Service extends RestService {
  constructor(http, aggregator, config) {
    super(http, aggregator, config, "purchasing-azure");
  }
}
