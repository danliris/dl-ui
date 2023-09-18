import { computedFrom, bindable } from "aurelia-framework";
var StorageLoader = require("../../../../loader/storage-loader");
var UomLoader = require("../../../../loader/uom-loader");
export class DeliveryOrderItem {
  @bindable storage;

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.readOnly = context.options.readOnly;

    // this.storage = this.data.Storage;
  }

  get product() {
    return `${this.data.Product.Code} - ${this.data.Product.Name}`;
  }

  @computedFrom("data.Unit")
  get filterUnit() {
    var storageFilter = {};
    if (this.data.Unit) {
      storageFilter.UnitName = this.data.Unit.Name;
    }

    return storageFilter;
  }

  get storageLoader() {
    return StorageLoader;
  }

  // storageChanged(newValue) {
  //   var selectedStorage = newValue;
  //   if (selectedStorage) {
  //     if (selectedStorage._id) {
  //       this.data.Storage = selectedStorage;
  //     } else {
  //       this.storage = null;
  //       this.data.Storage = null;
  //     }
  //   } else {
  //     this.storage = null;
  //     this.data.Storage = undefined;
  //   }
  // }

  storageView = (storage) => {
    return `${storage.name}`;
  };

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return `${uom.Unit || uom.unit}`;
  };

  @computedFrom("data.ReceiptQuantity", "data.Conversion")
  get SmallQuantity() {
    this.data.SmallQuantity = parseFloat(
      this.data.ReceiptQuantity * this.data.Conversion
    ).toLocaleString("en-EN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    this.data.RemainingQuantity = this.data.SmallQuantity;
    return parseFloat(
      this.data.ReceiptQuantity * this.data.Conversion
    ).toLocaleString("en-EN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  conversionChanged(e) {
    if (!this.error) this.error = {};
    if (this.data.Conversion % 1 >= 0) {
      if (
        !(
          (this.data.Conversion.length <= 16 &&
            this.data.Conversion.indexOf(".") > 0) ||
          (this.data.Conversion.length <= 15 &&
            this.data.Conversion.indexOf(".") < 0)
        )
      ) {
        this.error.Conversion = "Konversi tidak boleh lebih dari 15 digit";
      } else if (this.data.Conversion == 0 || this.data.Conversion == "0") {
        this.error.Conversion = "Conversion can not 0";
      } else {
        this.error.Conversion = null;
      }
    } else {
      this.error.Conversion = "Konversi Harus Diisi Dengan Angka";
    }
    this.data.Conversion = e.srcElement.value;
  }
}
