import { inject, bindable, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";

export class DoReturnDetailItem {
  @bindable data;
  @bindable error;

  shipmentDocumentTableOptions = {};

  shipmentQuery = {};
  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;

    console.log(this.data);
    if (this.data) {
      this.data.DOReturnItems = this.data.SalesInvoiceItems;
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
      "Harga Satuan",
      "Total Harga",
    ],
  };
}
