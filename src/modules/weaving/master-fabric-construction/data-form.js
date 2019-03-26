import { inject, bindable, computedFrom } from "aurelia-framework";

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable onCreated;
  @bindable Yarn;
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
  warpColumns = [
    { value: "__check" },
    { header: "Kode Lusi", value: "warpType.Code" },
    { header: "Benang Lusi", value: "warpType" },
    { header: "Qty(Gram/Meter)", value: "warp.Quantity" },
    { header: "Keterangan", value: "warp.Information" }
  ];
  weftColumns = [
    { value: "__check" },
    { header: "Kode Pakan", value: "weftType.Code" },
    { header: "Benang Pakan", value: "weftType" },
    { header: "Qty(Gram/Meter)", value: "weft.Quantity" },
    { header: "Keterangan", value: "weft.Information" }
  ];

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.Id) {
      this.ItemsWarp = this.data.ItemsWarp;
      this.ItemsWeft = this.data.ItemsWeft;

      this.ItemsWarp.forEach(item => {
        item["Select"] = true;
      });

      this.ItemsWeft.forEach(item => {
        item["Select"] = true;
      });
    }

    if (this.readOnly) {
      //Collections Columns on readOnly state
      this.warpColumns = [
        { header: "Kode Lusi", value: "warpType.Code" },
        { header: "Benang Lusi", value: "warpType" },
        { header: "Qty(Gram/Meter)", value: "warp.Quantity" },
        { header: "Keterangan", value: "warp.Information" }
      ];

      this.weftColumns = [
        { header: "Kode Pakan", value: "weftType.Code" },
        { header: "Benang Pakan", value: "weftType" },
        { header: "Qty(Gram/Meter)", value: "weft.Quantity" },
        { header: "Keterangan", value: "weft.Information" }
      ];
    } else {
      this.warpColumns = [
        { value: "__check" },
        { header: "Kode Lusi", value: "warpType.Code" },
        { header: "Benang Lusi", value: "warpType" },
        { header: "Qty(Gram/Meter)", value: "warp.Quantity" },
        { header: "Keterangan", value: "warp.Information" }
      ];

      this.weftColumns = [
        { value: "__check" },
        { header: "Kode Pakan", value: "weftType.Code" },
        { header: "Benang Pakan", value: "weftType" },
        { header: "Qty(Gram/Meter)", value: "weft.Quantity" },
        { header: "Keterangan", value: "weft.Information" }
      ];
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

  get MaterialTypeName() {
    let warpNames = [];
    let weftNames = [];
    let weftCompareName = [];
    var result = "";

    if (this.ItemsWarp) {
      if (this.ItemsWarp.length > 0) {
        this.ItemsWarp.forEach(item => {
          if (item.Select) {
            if (item.Yarn) {
              if (warpNames.indexOf(item.Yarn.Name) < 0) {
                warpNames.push(item.Yarn.Name);
              }
            }
          }
        });
      }
    }

    if (this.ItemsWeft) {
      if (this.ItemsWeft.length > 0) {
        this.ItemsWeft.forEach(item => {
          if (item.Select) {
            if (item.Yarn) {
              if (weftNames.indexOf(item.Yarn.Name) < 0) {
                weftNames.push(item.Yarn.Name);
              }
            }
          }
        });
      }
    }

    warpNames.forEach(name => {
      if (result == "") {
        result = name;
      } else {
        result = result + " " + name;
      }
    });

    weftNames.forEach(name => {
      warpNames.forEach(warpName => {
        if (name != warpName) {
          weftCompareName.push(name);
        }
      });
    });

    if (weftCompareName.length > 0) {
      weftCompareName.forEach(name => {
        result = result + " " + name;
      });
    }

    this.data.MaterialTypeName = result;
    return result;
  }

  //Concatenated some properties for create ConstructionNumber on Form
  get ConstructionNumber() {
    var result = "";
    var Name = this.MaterialTypeName ? this.MaterialTypeName : "";
    var Woven = this.data.WovenType ? this.data.WovenType : "";
    var Warp = this.data.AmountOfWarp ? this.data.AmountOfWarp : "";
    var Weft = this.data.AmountOfWeft ? this.data.AmountOfWeft : "";
    var Width = this.data.Width ? this.data.Width : "";
    result =
      Name +
      " " +
      Woven +
      " " +
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
          if (detail.Select) {
            if (detail.Yarn) {
              result = result + detail.Yarn.Code;
            }
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
          if (detail.Select) {
            if (detail.Yarn) {
              result = result + detail.Yarn.Code;
            }
          } else {
            result = "";
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
          if (detail.Select) {
            if (detail.YarnId && detail.Quantity != 0) {
              this.data.ItemsWarp.push(this.constructionDetail(detail));
            }
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
          if (detail.Select) {
            if (detail.YarnId && detail.Quantity != 0) {
              this.data.ItemsWeft.push(this.constructionDetail(detail));
            }
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
