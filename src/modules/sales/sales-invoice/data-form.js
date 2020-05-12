import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceCore } from "./service";

var BuyersLoader = require("../../../loader/buyers-loader");
var CurrencyLoader = require("../../../loader/currency-loader");
var UnitLoader = require("../../../loader/unit-loader");

@containerless()
@inject(Service, ServiceCore, BindingSignaler, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  @bindable SalesInvoiceDate;
  @bindable DueDate;
  @bindable VatType;
  @bindable getTempo;
  @bindable Tempo;
  @bindable Sales;

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

    this.VatType = this.data.VatType;
    this.TotalPayment = this.data.TotalPayment;
    this.Sales = this.data.Sales;
    this.data.TotalPayment = this.getTotalPayment;

    if (this.data.Currency && this.data.Currency.Id) {
      this.selectedCurrency = await this.serviceCore.getCurrencyById(
        this.data.Currency.Id
      );
    }

    if (this.data.Buyer && this.data.Buyer.Id) {
      this.selectedBuyer = await this.serviceCore.getBuyerById(
        this.data.Buyer.Id
      );
    }

    if(this.data.Unit&& this.data.Unit.Id){
      this.selectedUnit = await this.serviceCore.getUnitById(
        this.data.Unit.Id
      )
    }

    if (this.data.Buyer && this.data.Buyer.NPWP) {
      this.selectedBuyer.NPWP = this.data.Buyer.NPWP;
    }
    if (this.data.SalesInvoiceDate) {
      this.SalesInvoiceDate = this.data.SalesInvoiceDate;
    }

    if (this.data.DueDate) {
      this.DueDate = this.data.DueDate;
    }

    if (this.data.TotalPayment) {
      this.TotalPayment = this.data.TotalPayment;
      this.data.TotalPayment = this.getTotalPayment;
    }
    if(this.data.Tempo){
      this.Tempo = this.data.Tempo;
    }
    if(this.data.Sales){
      this.Sales = this.data.Sales;
    }
  }

  get getTotalPayment() {
    var totalPayment = 0;
    var result = 0;
    if (this.data.SalesInvoiceDetails) {
      for (var detail of this.data.SalesInvoiceDetails) {
        for (var item of detail.SalesInvoiceItems) {
          result += item.Amount;
        }
      }
    }
    if (this.VatType == "PPN BUMN") {
      totalPayment = result;
    } else {
      totalPayment = result * 0.1 + result;
    }
    this.data.TotalPayment = totalPayment;
    return totalPayment;
  }

  SalesInvoiceDateChanged(newValue, oldValue) {
    if (this.SalesInvoiceDate && this.Tempo) {
      this.data.SalesInvoiceDate = this.SalesInvoiceDate;
      this.data.Tempo = this.Tempo;
      var milisecondTemp = (1000 * 60 * 60 * 24* this.data.Tempo);

      var salesInvoiceTime = new Date(this.data.SalesInvoiceDate).getTime();
      var dueDate = new Date();
      dueDate.setTime(salesInvoiceTime + milisecondTemp);
      this.data.DueDate = new Date(dueDate);
      this.DueDate = new Date(dueDate);
      this.getTempo = this.Tempo;      
    }
  }
  DueDateChanged(newValue, oldValue) {

    if (this.SalesInvoiceDate && this.DueDate) {

      this.data.SalesInvoiceDate = this.SalesInvoiceDate;

      this.data.DueDate = this.DueDate;



      var salesInvoiceTime = new Date(this.data.SalesInvoiceDate).getTime();

      var dueTime = new Date(this.data.DueDate).getTime();

      this.getTempo = (dueTime - salesInvoiceTime) / (1000 * 60 * 60 * 24);
      this.Tempo = this.getTempo;

    }

  }

  TempoChanged(newValue, oldValue) {
    if (this.SalesInvoiceDate && this.Tempo) {
      this.data.SalesInvoiceDate = this.SalesInvoiceDate;
      this.data.Tempo = this.Tempo;
      var milisecondTemp = (1000 * 60 * 60 * 24* this.data.Tempo);

      var salesInvoiceTime = new Date(this.data.SalesInvoiceDate).getTime();
      var dueDate = new Date();
      dueDate.setTime(salesInvoiceTime + milisecondTemp);
      this.data.DueDate = new Date(dueDate);
      this.DueDate = new Date(dueDate);
      this.getTempo = this.Tempo;
    }
  }

  salesInvoiceDetailsInfo = {
    columns: ["No. Bon Pengiriman Barang"],
    onAdd: function () {
      this.context.SalesInvoiceDetailsCollection.bind();
      this.data.SalesInvoiceDetails = this.data.SalesInvoiceDetails || [];
      this.data.SalesInvoiceDetails.push({});
    }.bind(this),
    onRemove: function () {
      this.context.SalesInvoiceDetailsCollection.bind();
    }.bind(this),
  };
  itemOptions = {};

  salesInvoiceTypeOptions = [
    "",
    "BNG",
    "BAB",
    "BNS",
    "RNG",
    "BRG",
    "BAG",
    "BGS",
    "RRG",
    "BLL",
    "BPF",
    "BSF",
    "RPF",
    "BPR",
    "BSR",
    "RPR",
    "BAV",
    "BON",
    "BGM",
    "GPF",
    "RGF",
    "GPR",
    "RGR",
    "RON",
  ];
  VatTypeOptions = ["", "PPN Umum", "PPN Kawasan Berikat", "PPN BUMN"];

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedCurrency;
  selectedCurrencyChanged(newValue, oldValue) {
    if (this.selectedCurrency && this.selectedCurrency.Id) {
      this.data.Currency = {};
      this.data.Currency.Id = this.selectedCurrency.Id;
      this.data.Currency.Code = this.selectedCurrency.Code;
      this.data.Currency.Rate = this.selectedCurrency.Rate;
      this.data.Currency.Symbol = this.selectedCurrency.Symbol;
    } else {
      this.data.Currency.Id = null;
      this.data.Currency.Code = null;
      this.data.Currency.Rate = null;
      this.data.Currency.Symbol = null;
    }
  }

  @bindable selectedBuyer;
  selectedBuyerChanged(newValue, oldValue) {
    if (this.selectedBuyer && this.selectedBuyer.Id) {
      this.data.Buyer = {};
      this.data.Buyer.Id = this.selectedBuyer.Id;
      this.data.Buyer.Name = this.selectedBuyer.Name;
      this.data.Buyer.Code = this.selectedBuyer.Code;
      this.data.Buyer.Address = this.selectedBuyer.Address;
      this.data.Buyer.NPWP = this.selectedBuyer.NPWP;
      this.itemOptions.BuyerId = this.data.Buyer.Id;
    } else {
      this.data.Buyer.Id = null;
      this.data.Buyer.Name = null;
      this.data.Buyer.Code = null;
      this.data.Buyer.Address = null;
      this.data.Buyer.NPWP = null;
    }
  }

  @bindable selectedUnit
  selectedUnitChanged(n,o){
    if(this.selectedUnit && this.selectedUnit.Id){
      this.data.Unit = {};
        this.data.Unit.Id = this.selectedUnit.Id;
        this.data.Unit.Code = this.selectedUnit.Code;
        this.data.Unit.Name = this.selectedUnit.Name;
      }else{
        this.data.Unit.Id = null;
        this.data.Unit.Code = null;
        this.data.Unit.Name = null;
      }
    }

  get currencyLoader() {
    return CurrencyLoader;
  }
  get buyersLoader() {
    return BuyersLoader;
  }
  get unitLoader() {
    return UnitLoader;
  }
  
}
