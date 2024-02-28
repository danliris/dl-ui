import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { Service } from "./service";

@inject(Service)
export class DataForm {
  constructor(service) {
    this.service = service;
  }

  @bindable readOnly = false;
  @bindable title;

  wasteOptions = ["AVAL"];
  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 5,
    },
  };

  footerOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 2,
    },
  };

  itemsColumns = [
    { header: "Nomor RO", value: "RONo" },
    { header: "", value: "" },
    { header: "Artikel", value: "" },
  ];
  sourceName = "CUTTING CENTRAL";
  destinationName = "GUDANG AVAL";

  bind(context) {
    this.context = context;
    this.data = context.data;
    this.isUsed = this.data.IsUsed;
    this.error = context.error;
    this.Options = {
      isCreate: this.context.isCreate,
      readOnly: this.context.readOnly,
      isView: this.context.isView,
      isEdit: this.context.isEdit,
      checkedAll: this.context.isCreate == true ? false : true,
      header: this.data,
    };

    if (this.data) var roList = [];
    for (const item of this.data.Items) {
      var detail = {};
      if (roList.length == 0) {
        detail.RONo = item.RONo;
        detail.Article = item.Article;
        detail.FabricItems = [];
        detail.FabricItems.push({
          Product: item.Product,
          ProductRemark: item.ProductRemark,
          Quantity: item.Quantity,
          Uom: "KG",
          BCNo: item.BCNo,
          BCDate: item.BCDate,
          BCType: item.BCType,
          IsSave: true,
        });
        roList.push(detail);
      } else {
        var dup = roList.find((a) => a.RONo == item.RONo);
        if (!dup) {
          detail.RONo = item.RONo;
          detail.Article = item.Article;
          detail.FabricItems = [];
          detail.FabricItems.push({
            Product: item.Product,
            ProductRemark: item.ProductRemark,
            Quantity: item.Quantity,
            Uom: "KG",
            BCNo: item.BCNo,
            BCDate: item.BCDate,
            BCType: item.BCType,
            IsSave: true,
          });
          roList.push(detail);
        } else {
          var idx = roList.indexOf(dup);
          dup.FabricItems.push({
            Product: item.Product,
            ProductRemark: item.ProductRemark,
            Quantity: item.Quantity,
            Uom: "KG",
            BCNo: item.BCNo,
            BCDate: item.BCDate,
            BCType: item.BCType,
            IsSave: true,
          });

          roList[idx] = dup;
        }
      }
    }
    this.data.ROList = roList;
  }

  get addItems() {
    return (event) => {
      this.data.ROList.push({
        RONo: "",
      });
    };
  }

  get removeItems() {
    return (event) => {
      this.error = null;
      //this.Options.error = null;
    };
  }

  get totalQuantity() {
    if (this.data.ROList) {
      var qty = 0;
      for (var item of this.data.ROList) {
        for (var detail of item.FabricItems) {
          if (detail.IsSave) qty += detail.Quantity;
        }
      }
      this.data.TotalAval = qty;
      return qty;
    }
  }
}
