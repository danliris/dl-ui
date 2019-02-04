import { inject, bindable, computedFrom } from "aurelia-framework";
var MaterialTypeLoader = require("../../../loader/material-types-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable onCreated;
  @bindable warpType;
  @bindable weftType;
  @bindable ItemsWarp;
  @bindable ItemsWeft;
  readOnlyAll = "true";

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor(service) {
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  warpColumns = [
    { value: "__check" },
    { header: "Kode Lusi", value: "warpType.code" },
    { header: "Benang Lusi", value: "warpType" },
    { header: "Qty(Gram/Meter)", value: "warp.quantity" },
    { header: "Keterangan", value: "warp.information" }
  ];
  weftColumns = [
    { value: "__check" },
    { header: "Kode Pakan", value: "weftType.code" },
    { header: "Benang Pakan", value: "weftType" },
    { header: "Qty(Gram/Meter)", value: "weft.quantity" },
    { header: "Keterangan", value: "weft.information" }
  ];

  get materialTypeLoader() {
    return MaterialTypeLoader;
  }

  get addItemsWarp() {
    return event => {
      this.ItemsWarp.push({});
    };
  }

  get addItemsWeft() {
    return event => {
      this.ItemsWeft.push({});
    };
  }

  onCheckWarp(event) {
    for (var item of this.ItemsWarp) {
      item.Select = event.detail.target.checked;
    }
  }

  onCheckWeft(event) {
    for (var item of this.ItemsWeft) {
      item.Select = event.detail.target.checked;
    }
  }

  get totalYarn() {
    let result = 0;
    if (this.ItemsWarp && this.ItemsWeft) {
      if (this.ItemsWarp.length > 0) {
        for (let detail of this.ItemsWarp) {
          if (detail.Select) {
            result += detail.quantity;
          }
        }
      }
      if (this.ItemsWeft.length > 0) {
        for (let detail of this.ItemsWeft) {
          if (detail.Select) {
            result += detail.quantity;
          }
        }
      }
    }
    return result;
  }

  get warpTypeForm() {
    let result = "";
    if (this.ItemsWarp) {
      if (this.ItemsWarp.length > 0) {
        for (let detail of this.ItemsWarp) {
          if (detail.Select) {
            result = result + detail.materialCode + detail.ringCode;
          }
        }
      }
    }
    return result;
  }

  get weftTypeForm() {
    let result = "";
    if (this.ItemsWeft) {
      if (this.ItemsWeft.length > 0) {
        for (let detail of this.ItemsWeft) {
          if (detail.Select) {
            result = result + detail.materialCode + detail.ringCode;
          }
        }
      }
    }
    return result;
  }
}
