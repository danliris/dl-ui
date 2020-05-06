import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { ServiceProductionAzure } from "./../service";

var ShipmentDocumentLoader = require("../../../../loader/shin-shipment-document-loader");

@inject(ServiceProductionAzure, BindingSignaler, BindingEngine)
export class DoReturnDetailItem {
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
  shipmentQuery = {};
  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    this.BuyerId = item.context.options.BuyerId;
    this.shipmentQuery = { "BuyerId": this.BuyerId };


    // var shipmentDocumentId = this.data.ShipmentDocumentId;
    // console.log(this.data);
    // if (shipmentDocumentId) {
    //   this.selectedShipmentDocument = this.serviceProductionAzure.getShipmentDocumentById(
    //     shipmentDocumentId
    //   );
    //   console.log(this.selectedShipmentDocument)
    // }

    if (this.data.ShipmentDocumentId) {
      this.selectedShipmentDocument = {};
      this.selectedShipmentDocument.Id = this.data.ShipmentDocumentId;
      this.selectedShipmentDocument.Code = this.data.ShipmentDocumentCode;
    }
  }

  salesInvoiceItemsInfo = {
    columns: [
      "Kode Barang",
      "Nama Barang",
      "Banyak",
      "Jumlah",
      "Satuan",
      "Harga Satuan",
      "Total Harga"
    ]
  };

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedShipmentDocument;
  async selectedShipmentDocumentChanged(newValue, oldValue) {

    // this.selectedShipmentDocument = newValue;
    // if (newValue) {
    var dataGroup = await this.serviceProductionAzure.searchGroupedProduct(this.selectedShipmentDocument.Id);

    if (this.selectedShipmentDocument && this.selectedShipmentDocument.Id) {
      this.data.ShipmentDocumentId = this.selectedShipmentDocument.Id;
      this.data.ShipmentDocumentCode = this.selectedShipmentDocument.Code;
      if (!this.data.Id) {
        this.data.SalesInvoiceItems = [];
        for (var item of dataGroup) {
          var siData = {
            ProductName: item.ProductName,
            Quantity: item.Quantity,
            QuantityUOM: item.QuantityUOM,
            Total: item.Total
          };
          this.data.SalesInvoiceItems.push(siData);
        }
        // for (var detail of this.selectedShipmentDocument.Details) {
        //   for (var item of detail.Items) {
        //     for (var prItem of item.PackingReceiptItems) {
        //       var siData = {
        //         // ProductCode: prItem.ProductCode,
        //         ProductName: prItem.ProductName,
        //         Quantity: prItem.Quantity
        //       };
        //       this.data.SalesInvoiceItems.push(siData);
        //     }
        //   }
        // }
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
