import { inject, bindable, computedFrom } from "aurelia-framework";
var MaterialTypeLoader = require("../../../loader/material-types-loader");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable onCreated;
  @bindable yarn;
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

  //Collections Columns
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

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.id) {
      this.materialTypeDocument = this.data.materialTypeDocument;

      this.ItemsWarp = this.data.itemsWarp;
      this.ItemsWarpOptions = {};
      this.ItemsWarpOptions.code = "";
      this.ItemsWarpOptions.yarn = "";
      this.ItemsWarpOptions.quantity = "";
      this.ItemsWarpOptions.information = "";

      this.ItemsWeft = this.data.itemsWeft;
      this.ItemsWeftOptions = {};
      this.ItemsWeftOptions.code = "";
      this.ItemsWeftOptions.yarn = "";
      this.ItemsWeftOptions.quantity = "";
      this.ItemsWeftOptions.information = "";
    }
    if (this.readOnly) {
      //Collections Columns on readOnly state
      this.warpColumns = [
        { header: "Kode Lusi", value: "warpType.code" },
        { header: "Benang Lusi", value: "warpType" },
        { header: "Qty(Gram/Meter)", value: "warp.quantity" },
        { header: "Keterangan", value: "warp.information" }
      ];

      this.weftColumns = [
        { header: "Kode Pakan", value: "weftType.code" },
        { header: "Benang Pakan", value: "weftType" },
        { header: "Qty(Gram/Meter)", value: "weft.quantity" },
        { header: "Keterangan", value: "weft.information" }
      ];
    } else {
      this.warpColumns = [
        { value: "__check" },
        { header: "Kode Lusi", value: "warpType.code" },
        { header: "Benang Lusi", value: "warpType" },
        { header: "Qty(Gram/Meter)", value: "warp.quantity" },
        { header: "Keterangan", value: "warp.information" }
      ];

      this.weftColumns = [
        { value: "__check" },
        { header: "Kode Pakan", value: "weftType.code" },
        { header: "Benang Pakan", value: "weftType" },
        { header: "Qty(Gram/Meter)", value: "weft.quantity" },
        { header: "Keterangan", value: "weft.information" }
      ];
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  //Material Type Loader
  get materialTypeLoader() {
    return MaterialTypeLoader;
  }

  //Triggered when  "+" on Warp Collections Clicked
  get addItemsWarp() {
    return event => {
      this.ItemsWarp.push({});
    };
  }

  //Triggered when  "+" on Weft Collections Clicked
  get addItemsWeft() {
    return event => {
      this.ItemsWeft.push({});
    };
  }

  // Triggered when "check" on Warp Collections checked
  onCheckWarp(event) {
    for (var item of this.ItemsWarp) {
      item.Select = event.detail.target.checked;
    }
  }

  // Triggered when "check" on Weft Collections checked
  onCheckWeft(event) {
    for (var item of this.ItemsWeft) {
      item.Select = event.detail.target.checked;
    }
  }

  //Concatenated some properties for create constructionNumber on Form
  get constructionNumber() {
    var result = "";
    if (this.materialTypeDocument) {
      //API Properties vs Form Properties
      this.data.materialTypeDocument = {};
      this.data.materialTypeDocument.id = this.materialTypeDocument.id;
      this.data.materialTypeDocument.code = this.materialTypeDocument.code;
      this.data.materialTypeDocument.name = this.materialTypeDocument.name;
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

    if (data.yarn) {
      yarn.id = data.yarn.id;
      yarn.code = data.yarn.code;
      yarn.name = data.yarn.name;
    }
    if (yarn.id) {
      detail.yarn = yarn;
      this.data.constructionNumber = this.constructionNumber;
    }
    return detail;
  }

  //Sumed Up Yarn Quantity
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
          } else {
            var itemWarpsIndex = this.data.ItemsWarp.indexOf(detail);
            this.data.ItemsWarp.splice(itemWarpsIndex, 1);
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
          } else {
            var itemWeftsIndex = this.data.ItemsWeft.indexOf(detail);
            this.data.ItemsWeft.splice(itemWeftsIndex, 1);
          }
        }
      }
    }
    //API
    this.data.totalYarn = result;
    return result;
  }

  //Capture "Jenis Lusi" on Data Form, and show it on "Jenis Lusi dan Pakan"
  //The result used on constructionNumber as an element of ConstructionNumber
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

  //Capture "Jenis Pakan" on Data Form, and show it on "Jenis Lusi dan Pakan"
  //The result used on constructionNumber as an element of ConstructionNumber
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
