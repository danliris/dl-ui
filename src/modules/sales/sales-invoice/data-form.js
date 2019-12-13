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
var BuyersLoader = require("../../../loader/buyers-loader");
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

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  };

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

    var buyerId = this.data.BuyerId;
    if (buyerId) {
      this.selectedDOSales = await this.serviceCore.getBuyerById(
        buyerId,
        this.buyerFields
      );
    }
    else {
      this.selectedBuyer = {
        Id: this.data.BuyerId,
        Name: this.data.BuyerName,
        Address: this.data.BuyerAddress,
        NPWP: this.data.BuyerNPWP
      };
    }

    var currencyId = this.data.CurrencyId;
    if (currencyId) {
      this.selectedCurrency = await this.serviceCore.getCurrencyById(
        currencyId,
        this.currencyFields
      );
    }
    
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    this.SalesInvoiceDate = this.data.SalesInvoiceDate.getTime();
    this.DueDate = this.data.DueDate.getTime();
    if (this.SalesInvoiceDate && this.DueDate) {
      this.getTempo =
        (this.DueDate - this.SalesInvoiceDate) / (1000 * 60 * 60 * 24);
      this.data.SalesInvoiceDate = this.SalesInvoiceDate;
      this.data.DueDate = this.DueDate;
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
      this.getTempo =
        (this.DueDate - this.SalesInvoiceDate) / (1000 * 60 * 60 * 24);
      this.data.SalesInvoiceDate = this.SalesInvoiceDate;
      this.data.DueDate = this.DueDate;
    }
  }

  DueDateChanged(newValue, oldValue) {
    if (this.SalesInvoiceDate && this.DueDate) {
      this.getTempo =
        (this.DueDate - this.SalesInvoiceDate) / (1000 * 60 * 60 * 24);
      this.data.SalesInvoiceDate = this.SalesInvoiceDate;
      this.data.DueDate = this.DueDate;
    }
  }

  errorChanged() {
    console.log(this.error);
  }

  salesInvoiceDetailsInfo = {
    columns: [
      "Kode",
      "Kuantitas",
      "Jumlah",
      "Satuan",
      "Nama Barang",
      "Harga Satuan",
      "Total"
    ],
    onAdd: function() {
      this.context.SalesInvoiceDetailsCollection.bind();
      this.data.SalesInvoiceDetails = this.data.SalesInvoiceDetails || [];
      this.data.SalesInvoiceDetails.push({});
    }.bind(this),
    onRemove: function() {
      this.context.SalesInvoiceDetailsCollection.bind();
    }.bind(this)
  };

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
      this.data.DOSalesNo = this.selectedDOSales.Code;
      this.data.BuyerId = this.selectedDOSales.BuyerId;
      this.data.BuyerName = this.selectedDOSales.BuyerName;
      this.data.BuyerAddress = this.selectedDOSales.BuyerAddress;
      this.data.BuyerNPWP = this.selectedDOSales.BuyerNPWP;
    } else {
      this.data.DOSalesId = null;
      this.data.DOSalesNo = null;
      this.data.BuyerId = null;
      this.data.BuyerName = null;
      this.data.BuyerAddress = null;
      this.data.BuyerNPWP = null;
    }
  }

  @bindable selectedBuyer;
  selectedBuyerChanged(newValue, oldValue) {
    if (this.selectedBuyer && this.selectedBuyer.Id) {
      this.data.BuyerId = this.selectedBuyer.BuyerId;
      this.data.BuyerName = this.selectedBuyer.BuyerName;
      this.data.BuyerAddress = this.selectedBuyer.BuyerAddress;
      this.data.BuyerNPWP = this.selectedBuyer.BuyerNPWP;
    } else {
      this.data.BuyerId = null;
      this.data.BuyerName = null;
      this.data.BuyerAddress = null;
      this.data.BuyerNPWP = null;
    }
  }

  @bindable selectedCurrency;
  selectedCurrencyChanged(newValue, oldValue) {
    if (this.selectedCurrency && this.selectedCurrency.Id) {
      this.data.CurrencyId = this.selectedCurrency.Id;
      this.data.CurrencyCode = this.selectedCurrency.Code;
      this.data.CurrencySymbol = this.selectedCurrency.Symbol;
    } else {
      this.data.CurrencyId = null;
      this.data.CurrencyCode = null;
      this.data.CurrencySymbol = null;
    }
  }

  get doSalesLoader() {
    return DOSalesLoader;
  }

  get buyersLoader() {
    return BuyersLoader;
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
  deliveryOrderNoChanged(e) {
    console.log(this.data.DeliveryOrderNo);
  }
  npwpChanged(e) {
    console.log(this.data.NPWP);
  }
  nppkpChanged(e) {
    console.log(this.data.NPPKP);
  }
  debtorIndexNoChanged(e) {
    console.log(this.data.DebtorIndexNo);
  }
  buyerNameChanged(e) {
    console.log(this.data.BuyerName);
  }
  buyerNPWPChanged(e) {
    console.log(this.data.BuyerNPWP);
  }
  dispChanged(e) {
    console.log(this.data.Disp);
  }
  opChanged(e) {
    console.log(this.data.Op);
  }
  scChanged(e) {
    console.log(this.data.Sc);
  }
  tempoChanged(e) {
    console.log(this.getTempo);
  }
  getTotalItemChanged(e){
    this.console.log(this.getTotalItem);
  }
  useVatChanged(e) {
    console.log(this.data.useVat);
  }
  notesChanged(e) {
    console.log(this.data.Notes);
  }
}
