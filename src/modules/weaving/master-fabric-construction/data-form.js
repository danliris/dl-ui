import {
  inject,
  bindable,
  computedFrom
} from "aurelia-framework";

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable onCreated;
  @bindable Yarn;
  @bindable MaterialTypeName;
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

  //Collections Columns
  warpColumns = [{
      header: "Kode Lusi",
      value: "warpType.Code"
    },
    {
      header: "Benang Lusi",
      value: "warpType"
    },
    {
      header: "Qty(Gram/Meter)",
      value: "warp.Quantity"
    },
    {
      header: "Keterangan",
      value: "warp.Information"
    }
  ];

  weftColumns = [{
      header: "Kode Pakan",
      value: "weftType.Code"
    },
    {
      header: "Benang Pakan",
      value: "weftType"
    },
    {
      header: "Qty(Gram/Meter)",
      value: "weft.Quantity"
    },
    {
      header: "Keterangan",
      value: "weft.Information"
    }
  ];

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.Id) {
      this.MaterialTypeName = this.data.MaterialTypeName;
      this.ItemsWarp = this.data.ItemsWarp;
      this.ItemsWeft = this.data.ItemsWeft;
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  //Triggered when "+" on Warp Collections Clicked
  get addItemsWarp() {
    return event => {
      this.ItemsWarp.push({});
    };
  }

  //Triggered when "+" on Weft Collections Clicked
  get addItemsWeft() {
    return event => {
      this.ItemsWeft.push({});
    };
  }

  MaterialTypeNameChanged(newValue) {
    this.data.MaterialTypeName = newValue;
  }

  //Concatenated some properties for create ConstructionNumber on Form
  get ConstructionNumber() {
    var result = "";
    var MaterialName = this.data.MaterialTypeName ? this.data.MaterialTypeName : "";
    // var Woven = this.data.WovenType ? this.data.WovenType : "";
    var Warp = this.data.AmountOfWarp ? this.data.AmountOfWarp : "";
    var Weft = this.data.AmountOfWeft ? this.data.AmountOfWeft : "";
    var Width = this.data.Width ? this.data.Width : "";
    result =
      MaterialName +
      " " +
      // Woven +
      // " " +
      Warp +
      " " +
      Weft +
      " " +
      Width +
      " " +
      this.WarpTypeForm +
      " " +
      this.WeftTypeForm;
    this.data.ConstructionNumber = result;
    return result;
  }

  constructionDetail(data) {
    var detail = {};
    detail.YarnId = data.YarnId;
    detail.Quantity = data.Quantity;
    detail.Information = data.Information;

    if (data.Id) {
      this.data.ConstructionNumber = this.ConstructionNumber;
    }
    return detail;
  }

  //Capture "Jenis Lusi" on Data Form, and show it on "Jenis Lusi dan Pakan"
  //The result used on constructionNumber as an element of ConstructionNumber
  get WarpTypeForm() {
    let result = "";

    if (this.ItemsWarp) {
      if (this.ItemsWarp.length > 0) {
        for (let detail of this.ItemsWarp) {
          if (detail.Yarn) {
            result = result + detail.Yarn.Name;
          }
        }
      }
    }

    this.data.WarpTypeForm = result;
    return result;
  }

  //Capture "Jenis Pakan" on Data Form, and show it on "Jenis Lusi dan Pakan"
  //The result used on constructionNumber as an element of ConstructionNumber
  get WeftTypeForm() {
    let result = "";

    if (this.ItemsWeft) {
      if (this.ItemsWeft.length > 0) {
        for (let detail of this.ItemsWeft) {
          if (detail.Yarn) {
            result = result + detail.Yarn.Name;
          }
        }
      }
    }

    this.data.WeftTypeForm = result;
    return result;
  }

  //Sumed Up Yarn Quantity
  get TotalYarn() {
    let result = 0;

    if (this.ItemsWarp && this.ItemsWeft) {
      if (this.ItemsWarp.length > 0) {
        this.data.ItemsWarp = [];
        for (let detail of this.ItemsWarp) {
          if (detail.YarnId && detail.Quantity != 0) {
            this.data.ItemsWarp.push(this.constructionDetail(detail));
            result += detail.Quantity;
          } else {
            var ItemWarpsIndex = this.data.ItemsWarp.indexOf(detail);
            this.data.ItemsWarp.splice(ItemWarpsIndex, 1);
          }
        }
      }

      if (this.ItemsWeft.length > 0) {
        this.data.ItemsWeft = [];
        for (let detail of this.ItemsWeft) {
          if (detail.YarnId && detail.Quantity != 0) {
            this.data.ItemsWeft.push(this.constructionDetail(detail));
            result += detail.Quantity;
          } else {
            var ItemWeftsIndex = this.data.ItemsWeft.indexOf(detail);
            this.data.ItemsWeft.splice(ItemWeftsIndex, 1);
          }
        }
      }
    }

    this.data.TotalYarn = result;
    return result;
  }
}
