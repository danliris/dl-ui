import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceProductionAzure, ServiceCore } from "./service";

var ShipmentDocumentLoader = require("../../../loader/shipment-document-loader");
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
  @bindable BuyerNPWP;
  @bindable VatType;
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

    this.VatType = this.data.VatType;
    this.BuyerNPWP = this.data.BuyerNPWP;

    this.TotalPayment = this.data.TotalPayment;
    this.data.TotalPayment = this.getTotalPayment;

    var shipmentDocumentId = this.data.ShipmentDocumentId;
    if (shipmentDocumentId) {
      this.selectedShipmentDocument = await this.serviceProductionAzure.getShipmentDocumentById(
        shipmentDocumentId,
        this.shipmentDocumentFields
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

    if (this.data.TotalPayment) {
      this.TotalPayment = this.data.TotalPayment;
      this.data.TotalPayment = this.getTotalPayment;
    }

    if (this.data.BuyerNPWP) {
      this.BuyerNPWP = this.data.BuyerNPWP;
    }
  }

  get getTotalPayment() {
    var totalPayment = 0;
    var result = 0;
    if (this.data.SalesInvoiceDetails) {
      for (var item of this.data.SalesInvoiceDetails) {
        result += item.Amount;
      }
    }
    if (this.VatType == "PPN BUMN") {
      totalPayment = result;
    }
    else {
      totalPayment = result * 0.1 + result;
    }
    this.data.TotalPayment = totalPayment;
    return totalPayment;
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

  salesInvoiceDetailsInfo = {
    columns: [
      "Kode Barang",
      "Nama Barang",
      "Banyak",
      "Satuan",
      "Jumlah",
      "Harga",
      "Total"
    ]
  };

  shipmentDocumentTableOptions = {}

  salesInvoiceTypeOptions = ["", "BNG", "BAB", "BNS", "RNG", "BRG", "BAG", "BGS", "RRG", "BLL", "BPF", "BSF", "RPF", "BPR", "BSR", "RPR", "BAV", "BON", "BGM", "GPF", "RGF", "GPR", "RGR", "RON"];
  VatTypeOptions = ["", "PPN Umum", "PPN Kawasan Berikat", "PPN BUMN"];

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedShipmentDocument;
  selectedShipmentDocumentChanged(newValue, oldValue) {
    if (this.selectedShipmentDocument && this.selectedShipmentDocument.Id) {
      this.data.ShipmentDocumentId = this.selectedShipmentDocument.Id;
      this.data.ShipmentDocumentCode = this.selectedShipmentDocument.Code;
      this.data.BuyerId = this.selectedShipmentDocument.Buyer.Id;
      this.data.BuyerName = this.selectedShipmentDocument.Buyer.Name;
      this.data.BuyerAddress = this.selectedShipmentDocument.Buyer.Address;
      if (this.selectedShipmentDocument.Buyer.NPWP) {
        this.data.BuyerNPWP = this.selectedShipmentDocument.Buyer.NPWP;
      }
      if (!this.data.Id) {
        this.data.SalesInvoiceDetails = [];
        for (var detail of this.selectedShipmentDocument.Details) {
          for (var item of detail.Items) {
            for (var prItem of item.PackingReceiptItems) {
              var siData = {
                ProductCode: prItem.ProductCode,
                ProductName: prItem.ProductName,
                Quantity: prItem.Quantity
              };
              this.data.SalesInvoiceDetails.push(siData);
            }
          }
        }
        // console.log(this.data.SalesInvoiceDetails)
      }
    } else {
      this.data.ShipmentDocumentId = null;
      this.data.ShipmentDocumentCode = null;
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
      this.data.CurrencyRate = this.selectedCurrency.Rate;
      this.data.CurrencySymbol = this.selectedCurrency.Symbol;
    } else {
      this.data.CurrencyId = null;
      this.data.CurrencyCode = null;
      this.data.CurrencyRate = null;
      this.data.CurrencySymbol = null;
    }
  }

  get shipmentDocumentLoader() {
    return ShipmentDocumentLoader;
  }

  get currencyLoader() {
    return CurrencyLoader;
  }
}
