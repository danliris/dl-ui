import {
  inject,
  bindable,
  BindingEngine,
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceProductionAzure } from "./../service";

var SalesInvoiceLoader = require("../../../../loader/sales-invoice-loader");

@inject(Service, ServiceProductionAzure, BindingEngine, BindingSignaler)
export class DoReturnDetail {
  @bindable data;
  @bindable error;

  detailItemOptions = {};
  itemOptions = {};

  returnDetailsInfo = {
    columns: ["Ex. DO Penjualan"],
  };

  doReturnItemsInfo = {
    columns: [
      "Ex. Bon Pengiriman Barang Jadi",
      "Konstruksi",
      "Jenis/Kode",
      "Pcs/Roll/Pt",
      "Mtr/Yds",
    ],
  };

  constructor(service, serviceProductionAzure, bindingEngine, bindingSignaler) {
    this.service = service;
    this.serviceProductionAzure = serviceProductionAzure;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    this.selectedSalesInvoice = this.data.SalesInvoice || null;
  }

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedSalesInvoice;
  async selectedSalesInvoiceChanged(newValue, oldValue) {
    if (newValue) {
      this.data.SalesInvoice = this.selectedSalesInvoice;

      var salesInvoice = await this.service.getSalesInvoiceById(newValue.Id);

      var temp_detailItem = [];
      var temp_doReturnItem = [];

      for (var detail of salesInvoice.SalesInvoiceDetails) {
        var sd = await this.serviceProductionAzure.getShipmentDocumentById(
          detail.ShipmentDocumentId
        );
        if (!this.data.Id) {
          var detailItemData = {
            DOSales: sd.DOSales,
          };

          temp_detailItem.push(detailItemData);

          for (var item of detail.SalesInvoiceItems) {
            var itemData = {
              ShipmentDocumentId: detail.ShipmentDocumentId,
              ShipmentDocumentCode: detail.ShipmentDocumentCode,
              ProductName: item.ProductName,
              ProductCode: item.ProductCode,
              Quantity: item.Quantity,
              PackingUom: item.PackingUom,
              Total: item.Total,
              Uom: item.Uom,
            };
            temp_doReturnItem.push(itemData);
          }
        }
      }
      this.data.DOReturnDetailItems = temp_detailItem;
      this.data.DOReturnItems = temp_doReturnItem;
    } else {
      this.data.DOReturnDetailItems = [];
    }
  }

  get salesInvoiceLoader() {
    return SalesInvoiceLoader;
  }
}
