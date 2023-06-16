import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "../service";

// var DLLoader = require("../../../../loader/garment-subcon-delivery-letter-out-loader");
var DLLoader = require("../../../../loader/garment-delivery-order-loader");
var DLNonPOLoader = require("../../../../loader/garment-delivery-order-non-po-loader");
@inject(Service)
export class ItemIN {
  @bindable selectedDL;

  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;

    this.datas = context.context.options.datas;
    this.selectedDL = this.data.DLNo;
    this.POType = this.datas.POType;

    if (this.data.Id) {
      if (this.POType == "DENGAN PO") {
        this.data.productView =
          this.data.Product.Code + " - " + this.data.Product.Name;
      } else {
        this.data.productView = this.data.Product.Remark;
      }

      this.filter = {
        SupplierCode: this.data.Supplier != null ? this.data.Supplier.Code : "",
        IsSubconInvoice: false,
      };
    } else {
      this.filter = {
        SupplierCode:
          this.data.Supplier.code == null
            ? this.data.Supplier.Code
            : this.data.Supplier.code,
        IsSubconInvoice: false,
      };
    }
  }

  get dlLoader() {
    return DLLoader;
  }

  get dlNonPOLoader() {
    return DLNonPOLoader;
  }

  dlView = (dl) => {
    return `${dl.doNo}`;
  };

  selectedDLChanged(newValue) {
    if (newValue) {
      this.data.DLNo = newValue.doNo;
      this.data.DLDate = newValue.doDate;

      if (this.POType == "DENGAN PO") {
        for (var item of newValue.items) {
          for (var detail of item.details) {
            this.data.Product = detail.product;
            this.data.productView =
              this.data.Product.Code + " - " + this.data.Product.Name;
            this.data.Uom = detail.uom;
            this.data.TotalPrice = detail.priceTotal;
            this.data.PricePerDealUnit = detail.pricePerDealUnit;
            this.data.Quantity = detail.smallQuantity;
          }
        }
      } else {
        this.data.Product = {};
        for (var item of newValue.items) {
          this.data.Product.Remark = item.productRemark;
          this.data.productView = this.data.Product.Remark;
          this.data.Uom = item.uom;
          this.data.TotalPrice = item.priceTotal;
          this.data.PricePerDealUnit = item.pricePerDealUnit;
          this.data.Quantity = item.quantity;
        }
      }
    }
  }
  // toggle() {
  //   if (!this.isShowing) this.isShowing = true;
  //   else this.isShowing = !this.isShowing;
  // }
}
