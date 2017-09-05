import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'

@containerless()
export class DeliveryOrderItem {

  itemsColumns = [
    { header: "Nomor PO Eksternal" },
    { header: "Nomor PR" },
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
    this.isShowing = true;
  }

  get total() {
    if (this.data.items) {
      if (this.data.items.length > 0) {
        var qty = this.data.items
          .map((item) => parseInt(item.pricePerDealUnit * item.deliveredQuantity));
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