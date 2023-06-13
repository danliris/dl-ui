import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "../service";

var CurrencyLoader = require("../../../../loader/garment-currencies-by-date-loader");
var UomLoader = require("../../../../loader/uom-loader");

@inject(Service)
export class Item {
  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    this.hasCreate = context.context.options.hasCreate;
    this.hasEdit = context.context.options.hasEdit;
    this.hasView = context.context.options.hasView;
    this.items = this.context.context.items;
console.log("  this.options",  this.options)
    this.itemOptions = {
      error: this.error,
      isCreate: this.isCreate,
      isEdit: this.isEdit,
      readOnly: this.readOnly,
      isView: this.isView,
    };
  }

  get currencyLoader() {
    return CurrencyLoader;
  }

  currencyView = (currency) => {
    if (this.data.Id) {
      return currency.Code;
    } else {
      return currency.code;
    }
  };

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return `${uom.Unit || uom.unit}`;
  };
  
  removeItems = function () {
    this.bind();
  }
}
