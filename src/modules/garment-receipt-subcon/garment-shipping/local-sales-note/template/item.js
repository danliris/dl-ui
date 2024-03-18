import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
// const ProductLoader = require('../../../../../loader/garment-leftover-warehouse-product-loader');
const SCLoader = require("../../../../../loader/garment-sales-contracts-loader");
const UomLoader = require("../../../../../loader/uom-loader");
import { Service } from "../service";

@inject(Service)
export class Item {
  @bindable invoice;
  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    if (this.data.invoiceNo) {
      this.invoice = {
        invoiceNo: this.data.invoiceNo,
      };
    }
  }

  get scLoader() {
    return SCLoader;
  }

  get uomLoader() {
    return UomLoader;
  }

  invoiceView = (data) => {
    return `${data.invoiceNo || data.InvoiceNo}`;
  };

  uomView = (data) => {
    return `${data.Unit || data.unit || ""}`;
  };

  get total() {
    this.data.amount = this.data.quantity * this.data.price;

    return this.data.amount;
  }

  get invoiceLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          IsUsed: false,
          IsApproved: true,
          IsValidatedShipping: true,
        }),
      };
      return this.service.getPL(info).then((result) => {
        var invoiceList = [];
        for (var a of result.data) {
          if (invoiceList.length == 0) {
            var same = this.context.context.items.find(
              (x) => x.data.invoiceNo == a.invoiceNo
            );
            if (!same) {
              invoiceList.push(a);
            }
          } else {
            var same = this.context.context.items.find(
              (x) => x.data.invoiceNo == a.invoiceNo
            );
            var dup = invoiceList.find((d) => d.invoiceNo == a.invoiceNo);
            if (!dup && !same) {
              invoiceList.push(a);
            }
          }
        }
        return invoiceList;
      });
    };
  }

  invoiceChanged(newValue) {
    if (newValue) {
      this.data.invoiceNo = newValue.invoiceNo;
      this.data.packingListId = newValue.id;
      this.data.quantity = newValue.items.reduce(
        (acc, cur) => (acc += cur.totalQuantityPackingOut),
        0
      );
      this.data.price =
        newValue.items.reduce((acc, cur) => (acc += cur.amount), 0) /
        this.data.quantity;
      this.data.uom = newValue.items[0].uom;
    }
  }
}
