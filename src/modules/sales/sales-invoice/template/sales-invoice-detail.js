import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { ServiceProductionAzure } from "./../service";

var ShipmentDocumentLoader = require("../../../../loader/shipment-document-loader");

@inject(ServiceProductionAzure, BindingSignaler, BindingEngine)
export class SalesInvoiceDetail {
  @bindable data;
  @bindable error;

  shipmentDocumentTableOptions = {}

  constructor(
    serviceProductionAzure,
    bindingSignaler,
    bindingEngine
  ) {
    this.serviceProductionAzure = serviceProductionAzure;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;
  }

  activate(item) {
    // debugger
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;

    var shipmentDocumentId = this.data.ShipmentDocumentId;
    if (shipmentDocumentId) {
      this.selectedShipmentDocument = this.serviceProductionAzure.getShipmentDocumentById(
        shipmentDocumentId,
        this.shipmentDocumentFields
      );
    }

    if (this.data.ShipmentDocumentId) {
      this.selectedShipmentDocument.Id = this.data.ShipmentDocumentId;
      this.ShipmentDocumentId = this.data.ShipmentDocumentId;
    }

  }

  salesInvoiceItemsInfo = {
    columns: [
      "Kode Barang",
      "Nama Barang",
      "Banyak",
      "Jumlah",
      "Satuan",
      "Harga",
      "Total"
    ]
  };

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedShipmentDocument;
  selectedShipmentDocumentChanged(newValue, oldValue) {

    // this.selectedShipmentDocument = newValue;
    // if (newValue) {

    if (this.selectedShipmentDocument && this.selectedShipmentDocument.Id) {
      this.data.ShipmentDocumentId = this.selectedShipmentDocument.Id;
      this.data.ShipmentDocumentCode = this.selectedShipmentDocument.Code;
      if (!this.data.Id) {
        this.data.SalesInvoiceItems = [];
        for (var detail of this.selectedShipmentDocument.Details) {
          for (var item of detail.Items) {
            for (var prItem of item.PackingReceiptItems) {
              var siData = {
                // ProductCode: prItem.ProductCode,
                ProductName: prItem.ProductName,
                Quantity: prItem.Quantity
              };
              this.data.SalesInvoiceItems.push(siData);
            }
          }
        }
        console.log(prItem)
      }
    } else {
      this.data.ShipmentDocumentId = null;
      this.data.ShipmentDocumentCode = null;
    }
  }

  handleDataTypeChange() {
    this.data.DefaultValue = "";
    this.data.ShipmentDocumentCode = this.selectedShipmentDocument.Code;
  }

  get shipmentDocumentLoader() {
    return ShipmentDocumentLoader;
  }
}
