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

  async bind(context) {
    this.context = context;
    this.context._this = this;
    this.data = this.context.data;
    this.error = this.context.error;

    var shipmentDocumentId = this.data.ShipmentDocumentId;
    if (shipmentDocumentId) {
      this.selectedShipmentDocument = await this.serviceProductionAzure.getShipmentDocumentById(
        shipmentDocumentId,
        this.shipmentDocumentFields
      );
    }
  }

  salesInvoiceDetailItemsInfo = {
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
        console.log(this.selectedShipmentDocument.Buyer)
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

  get shipmentDocumentLoader() {
    return ShipmentDocumentLoader;
  }
}
