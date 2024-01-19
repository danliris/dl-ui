import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service, SalesService } from "../service";

@inject(Service)
export class Item {
  @bindable selectedUENNo;

  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;

    if (this.data.UENNo || this.data.uenNo) {
      this.selectedUENNo = {
        UENNo: this.data.UENNo || this.data.uenNo,
      };
    }
  }

  removeItems = function () {
    this.bind();
  };

  get bukLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          // BuyerId: this.data.productOwnerId,
          IsReceived: false,
          ExpenditureType: "SISA PRODUKSI",
        }),
      };
      return this.service.getBUK(info).then((result) => {
        var noList = [];
        for (var a of result.data) {
          if (noList.length == 0) {
            var same = this.context.context.items.find(
              (x) => x.data.UENNo == a.UENNo
            );
            if (!same) {
              noList.push(a);
            }
          } else {
            var same = this.context.context.items.find(
              (x) => x.data.UENNo == a.UENNo
            );
            var dup = noList.find((d) => d.UENNo == a.UENNo);
            if (!dup && !same) {
              noList.push(a);
            }
          }
        }
        return noList;
      });
    };
  }

  // uomView = (data) => {
  //   return `${data.Unit || data.unit || ""}`;
  // };

  selectedUENNoChanged(newValue) {
    if (newValue) {
      this.data.UENNo = newValue.UENNo;
      this.data.UENId = newValue.Id;

      newValue.Items.forEach((element) => {
        var detail = { product: {}, uom: {} };

        detail.product.Id = element.ProductId;
        detail.product.Code = element.ProductCode;
        detail.product.Name = element.ProductName;
        detail.quantity = element.Quantity;
        detail.uom.id = element.UomId;
        detail.uom.unit = element.UomUnit;

        this.data.details.push(detail);
      });

      this.isShowing = true;
      // this.data.quantity = quantity;
      // this.data.uom = uom;
    }
  }

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }

  itemsColumns = [
    { header: "Kode Barang" },
    { header: "Nama Barang" },
    { header: "Quantity" },
    { header: "Satuan" },
  ];
}
