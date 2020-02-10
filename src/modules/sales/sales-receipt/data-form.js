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
@inject(Service, ServiceCore, BindingSignaler, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  @bindable SalesReceiptDate;

  constructor(service, serviceCore, bindingSignaler, bindingEngine) {
    this.service = service;
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

    this.TotalPaid = this.data.TotalPaid;
    this.data.TotalPaid = this.getTotalPaid;

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

    if (this.data.SalesReceiptDate) {
      this.salesInvoiceTableOptions.SalesReceiptDate = this.data.SalesReceiptDate;
      this.SalesReceiptDate = this.data.SalesReceiptDate;
    }

    if (this.data.TotalPaid) {
      this.TotalPaid = this.data.TotalPaid;
      this.data.TotalPaid = this.getTotalPaid;
    }
  }

  get getTotalPaid() {
    var result = 0;
    if (this.data.SalesReceiptDetails) {
      for (var item of this.data.SalesReceiptDetails) {
        result += item.Nominal;
      }
    }
    this.data.TotalPaid = result;
    return result;
  }

  SalesReceiptDateChanged(newValue, oldValue) {
    if (newValue) {
      this.salesInvoiceTableOptions.SalesReceiptDate = newValue;
    }
    this.data.SalesReceiptDate = this.SalesReceiptDate;
  }

  salesReceiptDetailsInfo = {
    columns: [
      "No. Jual",
      "Tempo (hari)",
      "Total Harga",
      "Kurs",
      "Dibayar Sebelumnya",
      "Nominal",
      "Sisa Pembayaran",
      "Kelebihan Bayar",
      "Lunas",
    ],
    onAdd: function () {
      this.context.SalesReceiptDetailsCollection.bind();
      this.data.SalesReceiptDetails = this.data.SalesReceiptDetails || [];
      this.data.SalesReceiptDetails.push({});
    }.bind(this),
    onRemove: function () {
      this.context.SalesReceiptDetailsCollection.bind();
    }.bind(this)
  };

  salesInvoiceTableOptions = {};

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
      this.data.AccountCOA = this.selectedBank.AccountCOA;
      this.data.AccountName = this.selectedBank.AccountName;
      this.data.AccountNumber = this.selectedBank.AccountNumber;
      this.data.BankName = this.selectedBank.BankName;
      this.data.BankCode = this.selectedBank.BankCode;
    } else {
      this.data.BankId = null;
      this.data.AccountCOA = null;
      this.data.AccountName = null;
      this.data.AccountNumber = null;
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

  bankView = (bank) => {
    return bank.AccountName ? `${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : '';
  }

  errorChanged() {
    console.log(this.error);
  }
}
