import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'

@containerless()
export class DeliveryOrderItem {

  itemsColumns = [
    { header: "Nomor PO Eksternal" },
    { header: "Nomor RO" },
    { header: "Nomor PR" },
    { header: "Nomor Ref PR" },
    { header: "Kode - Nama Barang" },
    { header: "Jumlah" },
    { header: "Satuan" },
    { header: "Harga Satuan" },
    { header: "Harga Total" }
  ]

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isShowing = false;
  }

  get total() {
    if (this.data.items) {
      if (this.data.items.length > 0) {
        var qty = this.data.items
          .map((item) => Number.isInteger(item.pricePerDealUnit * item.deliveredQuantity)?item.pricePerDealUnit * item.deliveredQuantity : Number((item.pricePerDealUnit * item.deliveredQuantity).toFixed(2)))
        return qty
          .reduce((prev, curr, index) => { return prev + curr }, 0);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}