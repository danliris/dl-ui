import { inject, bindable, computedFrom } from "aurelia-framework";
var ConstructionLoader = require("../../../loader/weaving-constructions-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable onCreated;
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
    { header: "Kode Lusi", value: "warp.code" },
    { header: "Benang Lusi", value: "warpType" },
    { header: "Qty(Gram/Meter)", value: "amountOfWarp" },
    { header: "Keterangan", value: "warp.information" }
  ];
  weftColumns = [
    { header: "Kode Pakan", value: "weft.code" },
    { header: "Benang Pakan", value: "weftType" },
    { header: "Qty(Gram/Meter)", value: "amountOfWeft" },
    { header: "Keterangan", value: "weft.information" }
  ];

  // @computedFrom("data._id")
  // get isEdit() {
  //     return (this.data._id || '').toString() != '';
  // }

  get constructions() {
    return ConstructionLoader;
  }

  get addItemsWarp() {
    return event => {
      this.data.ItemsWarp.push({detail:"WARP"});
    };
  }

  get addItemsWeft() {
    return event => {
      this.data.ItemsWeft.push({detail:"WEFT"});
    };
  }
}
