import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from '../../../../utils/rest-service';

const ReadList = "ReadMaterialRequest";
const ReadDetail = "ReadDetailMaterialRequest";
//const getArea = "GetArea";
// const getAreaBaru = "GetAreaBaru";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "dyeing");
  }

  search(info) {
    var endpoint = `${ReadList}`;
    return super.list(endpoint, info);
  }

  searchDetail(info) {
    var endpoint = `${ReadDetail}`;
    return super.list(endpoint, info);
  }
}
