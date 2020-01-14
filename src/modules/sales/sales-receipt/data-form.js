import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceCore } from "./service";

var BuyersLoader = require("../../../loader/buyers-loader");
var BankLoader = require("../../../loader/account-banks-loader");


@containerless()
@inject(
  Service,
  ServiceCore,
  BindingSignaler,
  BindingEngine
)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;

  constructor(
    service,
    serviceProductionAzure,
    servicePurchasingAzure,
    serviceCore,
    bindingSignaler,
    bindingEngine
  ) {
    this.service = service;
    this.serviceProductionAzure = serviceProductionAzure;
    this.servicePurchasingAzure = servicePurchasingAzure;
    this.serviceCore = serviceCore;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() !== "";
  }

  async bind(context) {
    this.context = context;
    this.context._this = this;
    this.data = this.context.data;
    this.error = this.context.error;

    var buyerId = this.data.BuyerId;
    if (buyerId) {
      this.selectedBuyer = await this.serviceCore.getBuyerById(
        buyerId,
        this.buyerFields
      );
    }

    var bankId = this.data.BankId;
    if (bankId) {
      this.selectedBank = await this.serviceCore.getBankById(
        bankId,
        this.bankFields
      );
    }

  }

  errorChanged() {
    console.log(this.error);
  }

  salesReceiptDetailsInfo = {
    columns: [
      "No. Jual",
      "Tempo (hari)",
      "Total Harga",
      "Sudah Dibayar",
      "Nominal",
      "Sisa Pembayaran"
    ],
    onAdd: function() {
      this.context.SalesReceiptDetailsCollection.bind();
      this.data.SalesReceiptDetails = this.data.SalesReceiptDetails || [];
      this.data.SalesReceiptDetails.push({});
    }.bind(this),
    onRemove: function() {
      this.context.SalesReceiptDetailsCollection.bind();
    }.bind(this)
  };

  salesReceiptTypeOptions = ["", "A", "B", "C", "D"];

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedBuyer;
  selectedBuyerChanged(newValue, oldValue) {
    if (this.selectedBuyer && this.selectedBuyer.Id) {
      this.data.BuyerId = this.selectedBuyer.Id;
      this.data.BuyerName = this.selectedBuyer.Name;
      this.data.BuyerAddress = this.selectedBuyer.Address;
    } else {
      this.data.BuyerId = null;
      this.data.BuyerName = null;
      this.data.BuyerAddress = null;
    }
  }

  @bindable selectedBank;
  selectedBankChanged(newValue, oldValue) {
    if (this.selectedBank && this.selectedBank.Id) {
      this.data.BankId = this.selectedBank.Id;
      this.data.BankName = this.selectedBank.BankName;
      this.data.BankCode = this.selectedBank.BankCode;
    } else {
      this.data.BankId = null;
      this.data.BankName = null;
      this.data.BankAddress = null;
    }
  }

  get buyersLoader() {
    return BuyersLoader;
  }
  get bankLoader() {
    return BankLoader;
  }

  console() {
    console.log(this.data);
  }
  salesReceiptNoChanged(e) {
    console.log(this.data.SalesReceiptNo);
  }
  salesReceiptTypeChanged(e) {
    console.log(this.data.SalesReceiptType);
  }
}
