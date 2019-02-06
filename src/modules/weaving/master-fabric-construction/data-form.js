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
  @bindable materialTypeDocument;
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
    console.log(this.data);
    // if (this.data.ItemsWarp) {
    //   this.ItemsWarp = this.data.ItemsWarp;
    // }
    // if (this.data.ItemsWeft) {
    //   this.ItemsWeft = this.data.ItemsWeft;
    // }
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

  //
  get constructionNumber() {
    var result = "";
    if (this.materialTypeDocument) {
      //API Properties vs Form Properties
      this.data.materialTypeDocument = {};
      this.data.materialTypeDocument.id = this.materialTypeDocument.id;
      this.data.materialTypeDocument.name = this.materialTypeId.name;
      var code = this.materialTypeDocument.code
        ? this.materialTypeDocument.code
        : "";
      var woven = this.data.wovenType ? this.data.wovenType : "";
      var warp = this.data.amountOfWarp ? this.data.amountOfWarp : "";
      var weft = this.data.amountOfWeft ? this.data.amountOfWeft : "";
      var width = this.data.width ? this.data.width : "";
      result =
        code +
        " " +
        woven +
        " " +
        warp +
        " " +
        weft +
        " " +
        width +
        " " +
        this.warpTypeForm +
        " " +
        this.weftTypeForm;
    }
    return result;
  }

  constructionDetail(data) {
    var detail = {};
    var yarn = {};
    detail.quantity = data.quantity;
    detail.information = data.information;

    if (data.warpType) {
      yarn.id = data.warpType.id;
      yarn.code = data.warpType.code;
      yarn.name = data.warpType.name;
    }
    if (data.weftType) {
      yarn.id = data.weftType.id;
      yarn.code = data.weftType.code;
      yarn.name = data.weftType.name;
    }

    if (yarn.id) {
      detail.yarn = yarn;
      this.data.constructionNumber = this.constructionNumber;
    }
    return detail;
  }

  get totalYarn() {
    let result = 0;
    if (this.ItemsWarp && this.ItemsWeft) {
      if (this.ItemsWarp.length > 0) {
        //API
        this.data.ItemsWarp = [];
        for (let detail of this.ItemsWarp) {
          if (detail.Select) {
            this.data.ItemsWarp.push(this.constructionDetail(detail));
            result += detail.quantity;
          }
        }
      }
      if (this.ItemsWeft.length > 0) {
        for (let detail of this.ItemsWeft) {
          //API
          this.data.ItemsWeft = [];
          if (detail.Select) {
            this.data.ItemsWeft.push(this.constructionDetail(detail));
            result += detail.quantity;
          }
        }
      }
    }
    //API
    this.data.totalYarn = result;
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
    this.data.warpTypeForm = result;
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
    this.data.weftTypeForm = result;
    return result;
  }
}
