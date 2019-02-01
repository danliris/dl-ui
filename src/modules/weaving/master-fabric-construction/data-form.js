import { inject, bindable, computedFrom } from "aurelia-framework";
var MaterialTypeLoader = require("../../../loader/material-types-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable onCreated;
  @bindable warpType;
  @bindable weftType;
  readOnlyAll="true";

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
    { header: "Kode Lusi", value: "warpType.code" },
    { header: "Benang Lusi", value: "warpType" },
    { header: "Qty(Gram/Meter)", value: "warp.quantity" },
    { header: "Keterangan", value: "warp.information" }
  ];
  weftColumns = [
    { header: "Kode Pakan", value: "weftType.code" },
    { header: "Benang Pakan", value: "weftType" },
    { header: "Qty(Gram/Meter)", value: "weft.quantity" },
    { header: "Keterangan", value: "weft.information" }
  ];

  // @computedFrom("data._id")
  // get isEdit() {
  //     return (this.data._id || '').toString() != '';
  // }

  get materialTypeLoader() {
    return MaterialTypeLoader;
  }

  get addItemsWarp() {
    return event => {
      this.data.ItemsWarp.push({});
    };
  }

  get addItemsWeft() {
    return event => {
      this.data.ItemsWeft.push({});
    };
  }

  // get ItemsWarpListener(){
  //   if(){
  //   }
  // }

  // get ItemsWeftListener(){
  //   if(){
  //   }
  // }
}
