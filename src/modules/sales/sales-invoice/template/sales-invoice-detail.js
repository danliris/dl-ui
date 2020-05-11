import { inject, bindable, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { ServiceProductionAzure } from "./../service";
import { DataForm } from "./../data-form";
var ShipmentDocumentLoader = require("../../../../loader/shin-shipment-document-loader");

@inject(ServiceProductionAzure, BindingSignaler, BindingEngine,DataForm)

export class SalesInvoiceDetail {
  @bindable data;
  @bindable error;
  @bindable typeFaktur;

  shipmentDocumentTableOptions = {};

  constructor(serviceProductionAzure, bindingSignaler, bindingEngine,dataForm) {
    
    this.serviceProductionAzure = serviceProductionAzure;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;
    this.dataForm = dataForm;
  }
  shipmentQuery = {};
  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    this.BuyerId = item.context.options.BuyerId;
    this.shipmentQuery = { "BuyerId": this.BuyerId };

    if (this.data.ShipmentDocumentId) {
      this.selectedShipmentDocument = {};
      this.selectedShipmentDocument.Id = this.data.ShipmentDocumentId;
      this.selectedShipmentDocument.Code = this.data.ShipmentDocumentCode;
    }
    if(this.dataForm.data.SalesInvoiceType){
      this.typeFaktur = this.dataForm.data.SalesInvoiceType;
    }
  }

  salesInvoiceItemsInfo = {
    columns: [
      "Kode Barang",
      "Nama Barang",
      "Banyak",
      "Satuan Packing",
      "Jumlah",
      "Satuan",
      "Nilai Konversi",
      "Harga Satuan",
      "Total Harga",
    ],
  };

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedShipmentDocument;
  async selectedShipmentDocumentChanged(newValue, oldValue) {
    var dataGroup = await this.serviceProductionAzure.searchGroupedProduct(
      this.selectedShipmentDocument.Id
    );
    var dataProductIdentity = await this.serviceProductionAzure.searchGroupedProductWithProductIdentity(
      this.selectedShipmentDocument.Id
    );
    if (this.selectedShipmentDocument && this.selectedShipmentDocument.Id) {
      this.data.ShipmentDocumentId = this.selectedShipmentDocument.Id;
      this.data.ShipmentDocumentCode = this.selectedShipmentDocument.Code;
      if (!this.data.Id) {
        this.data.SalesInvoiceItems = [];
        for (var item of dataGroup) {
          var siData = {
            ProductName: item.ProductName,
            Quantity: item.Quantity,
            PackingUom: item.QuantityUOM,
            Total: item.Total,
            ProductCode : dataProductIdentity.ProductIdentity
          };
          this.data.SalesInvoiceItems.push(siData);
        }
      }
    } else {
      this.data.ShipmentDocumentId = null;
      this.data.ShipmentDocumentCode = null;
    }
  }

  get shipmentDocumentLoader() {
    return ShipmentDocumentLoader;
  }
}
