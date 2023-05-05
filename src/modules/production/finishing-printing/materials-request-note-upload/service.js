import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from '../../../../utils/rest-service';

const ReadList = "ReadMaterialRequest";
const ReadDetail = "ReadDetailMaterialRequest";
const GetPDF="GetPDFMaterialRequest";
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

  getPdf(info) {
    var endpoint = `${GetPDF}`;
    var query = '';
    if (info.unitId) {
        if (query === '') query = `unitId=${info.unitId}`;
        else query = `${query}&unitId=${info.unitId}`;
    }
    if (info.periode) {
        if (query === '') query = `periode=${info.periode}`;
        else query = `${query}&periode=${info.periode}`;
    }
    if (query !== '')
      endpoint = `${endpoint}?${query}`;

    var filename= "Surat Permintaan Barang " + info.unit +".pdf";
    return super.getPdfAF(endpoint,"",filename);
  }
}
