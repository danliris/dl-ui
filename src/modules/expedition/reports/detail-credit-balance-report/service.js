import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "report/detail-credit-balance";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  searchLocal(info) {
    var endpoint = `${serviceUri}?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=false&isForeignCurrency=false`;
    return super.get(endpoint);
  }

  searchLocalForeignCurrency(info) {
    var endpoint = `${serviceUri}?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=false&isForeignCurrency=true`;
    return super.get(endpoint);
  }

  searchImport(info) {
    var endpoint = `${serviceUri}?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=true&isForeignCurrency=false`;
    return super.get(endpoint);
  }

  generateExcelLocal(info) {
    var endpoint = `${serviceUri}/xls?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=false&isForeignCurrency=false`;
    return super.getXls(endpoint);
  }

  generateExcelLocalForeignCurrency(info) {
    var endpoint = `${serviceUri}/xls?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=false&isForeignCurrency=true`;
    return super.getXls(endpoint);
  }

  generateExcelImport(info) {
    var endpoint = `${serviceUri}/xls?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=true&isForeignCurrency=false`;
    return super.getXls(endpoint);
  }

  printPdfLocal(info) {
    var endpoint = `${serviceUri}/pdf?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=false&isForeignCurrency=false`;
    return super.getPdf(endpoint);
  }

  printPdfLocalForeignCurrency(info) {
    var endpoint = `${serviceUri}/pdf?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=false&isForeignCurrency=true`;
    return super.getPdf(endpoint);
  }

  printPdfImport(info) {
    var endpoint = `${serviceUri}/pdf?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=true&isForeignCurrency=false`;
    return super.getPdf(endpoint);
  }

  /*
  search(filter) {
    var endpoint = `${serviceUri}?categoryId=${filter.categoryId}&accountingUnitId=${filter.accountingUnitId}&divisionId=${filter.divisionId}&dateTo=${filter.dateTo}`;
    return super.get(endpoint);
  }
*/

  /*
  generateExcel(filter) {
    var endpoint = `${serviceUri}/download?no=${filter.no}&accountingUnitId=${filter.accountingUnitId}&accountingCategoryId=${filter.accountingCategoryId}&dateFrom=${filter.dateFrom}&dateTo=${filter.dateTo}`;
    return super.getXls(endpoint);
  }
  */

  /*
  printPdf(filter) {
    var endpoint = `${serviceUri}/pdf?no=${filter.no}&accountingUnitId=${filter.accountingUnitId}&accountingCategoryId=${filter.accountingCategoryId}&dateFrom=${filter.dateFrom}&dateTo=${filter.dateTo}`;
    return super.getPdf(endpoint);
  }
  */
}
