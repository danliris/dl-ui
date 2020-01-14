import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceProductionAzure, ServiceCore } from "./service";

var DOSalesLoader = require("../../../loader/do-sales-loader");
var CurrencyLoader = require("../../../loader/currency-loader");

@containerless()
@inject(
  Service,
  ServiceProductionAzure,
  ServiceCore,
  BindingSignaler,
  BindingEngine
)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  @bindable SalesInvoiceDate;
  @bindable DueDate;
  @bindable getTempo;

  constructor(
    service,
    serviceProductionAzure,
    serviceCore,
    bindingSignaler,
    bindingEngine
  ) {
    this.service = service;
    this.serviceProductionAzure = serviceProductionAzure;
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

    var doSalesId = this.data.DOSalesId;
    if (doSalesId) {
      this.selectedDOSales = await this.serviceProductionAzure.getDOSalesById(
        doSalesId,
        this.doSalesFields
      );
    }

    var currencyId = this.data.CurrencyId;
    if (currencyId) {
      this.selectedCurrency = await this.serviceCore.getCurrencyById(
        currencyId,
        this.currencyFields
      );
    }

    if (this.data.SalesInvoiceDate) {
      this.SalesInvoiceDate = this.data.SalesInvoiceDate;
    }

    if (this.data.DueDate) {
      this.DueDate = this.data.DueDate;
    }
  }

  get getTotalItem() {
    var result = 0;
    for (var item of this.data.SalesInvoiceDetails) {
      result += item.Amount;
    }
    return result * 0.1 + result;
  }

  SalesInvoiceDateChanged(newValue, oldValue) {
    if (this.SalesInvoiceDate && this.DueDate) {
      this.data.SalesInvoiceDate = this.SalesInvoiceDate;
      this.data.DueDate = this.DueDate;

      var salesInvoiceTime = new Date(this.data.SalesInvoiceDate).getTime();
      var dueTime = new Date(this.data.DueDate).getTime();
      this.getTempo = (dueTime - salesInvoiceTime) / (1000 * 60 * 60 * 24);
    }
  }

  DueDateChanged(newValue, oldValue) {
    if (this.SalesInvoiceDate && this.DueDate) {
      this.data.SalesInvoiceDate = this.SalesInvoiceDate;
      this.data.DueDate = this.DueDate;

      var salesInvoiceTime = new Date(this.data.SalesInvoiceDate).getTime();
      var dueTime = new Date(this.data.DueDate).getTime();
      this.getTempo = (dueTime - salesInvoiceTime) / (1000 * 60 * 60 * 24);
    }
  }

  errorChanged() {
    console.log(this.error);
  }

  salesInvoiceDetailsInfo = {
    columns: [
      "Kode Barang",
      "Nama Barang",
      "Banyak",
      "Satuan",
      "Jumlah",
      "Harga Satuan",
      "Total"
    ]
  };

  doSalesTableOptions = {}

  salesInvoiceTypeOptions = ["", "BPF", "BPS", "BPP", "BRG"];

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedDOSales;
  selectedDOSalesChanged(newValue, oldValue) {
    if (this.selectedDOSales && this.selectedDOSales.Id) {
      this.data.DOSalesId = this.selectedDOSales.Id;
      this.data.DOSalesNo = this.selectedDOSales.DOSalesNo;
      this.data.BuyerId = this.selectedDOSales.BuyerId;
      this.data.BuyerName = this.selectedDOSales.BuyerName;
      this.data.BuyerAddress = this.selectedDOSales.BuyerAddress;
      this.data.BuyerNPWP = this.selectedDOSales.BuyerNPWP;
      this.data.Disp = this.selectedDOSales.Disp;
      this.data.Op = this.selectedDOSales.Op;
      this.data.Sc = this.selectedDOSales.Sc;
      if(!this.data.Id){
      this.data.SalesInvoiceDetails = this.selectedDOSales.DOSalesDetails.map((item) => ({
        UnitCode : item.UnitCode,
        UnitName : item.UnitName
      }));
      }
    } else {
      this.data.DOSalesId = null;
      this.data.DOSalesNo = null;
      this.data.BuyerId = null;
      this.data.BuyerName = null;
      this.data.BuyerAddress = null;
      this.data.BuyerNPWP = null;
      this.data.Disp = null;
      this.data.Op = null;
      this.data.Sc = null;
    }
  }

  @bindable selectedCurrency;
  selectedCurrencyChanged(newValue, oldValue) {
    if (this.selectedCurrency && this.selectedCurrency.Id) {
      this.data.CurrencyId = this.selectedCurrency.Id;
      this.data.CurrencyCode = this.selectedCurrency.Code;
      this.data.CurrencyRate = this.selectedCurrency.Rate;
      this.data.CurrencySymbol = this.selectedCurrency.Symbol;
    } else {
      this.data.CurrencyId = null;
      this.data.CurrencyCode = null;
      this.data.CurrencyRate = null;
      this.data.CurrencySymbol = null;
    }
  }

  get doSalesLoader() {
    return DOSalesLoader;
  }

  get currencyLoader() {
    return CurrencyLoader;
  }

  console() {
    console.log(this.data);
  }
  salesInvoiceNoChanged(e) {
    console.log(this.data.SalesInvoiceNo);
  }
  salesInvoiceTypeChanged(e) {
    console.log(this.data.SalesInvoiceType);
  }
  deliveryOrderNoChanged(e) {
    console.log(this.data.DeliveryOrderNo);
  }
  debtorIndexNoChanged(e) {
    console.log(this.data.DebtorIndexNo);
  }
  tempoChanged(e) {
    console.log(this.getTempo);
  }
  getTotalItemChanged(e) {
    this.console.log(this.getTotalItem);
  }
  useVatChanged(e) {
    console.log(this.data.useVat);
  }
  remarkChanged(e) {
    console.log(this.data.Remark);
  }
  idNoChanged(e) {
    console.log(this.data.IDNo);
  }
}
