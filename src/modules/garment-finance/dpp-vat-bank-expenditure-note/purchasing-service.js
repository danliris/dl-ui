import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "garment-intern-notes";

export class PurchasingService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "purchasing-azure");
  }

  dppVATBankExpenditureNotes(info) {
    let endpoint = `${serviceUri}/dpp-vat-bank-expenditures?supplierId=${info.supplierId}&currencyCode=${info.currencyCode}&niId=${info.niId}`;
    return super.get(endpoint);
  }

  GetNi(info) {
    let endpoint = `${serviceUri}/ni-for-dpp-vat-bank-expenditures`;
    return super.list(endpoint, info);
  }
}
