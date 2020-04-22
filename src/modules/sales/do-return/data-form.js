import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceFinishingPrinting } from "./service";

@containerless()
@inject(Service, ServiceFinishingPrinting, BindingSignaler, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;

  constructor(
    service,
    serviceFinishingPrinting,
    bindingSignaler,
    bindingEngine
  ) {
    this.service = service;
    this.serviceFinishingPrinting = serviceFinishingPrinting;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;
  }
  
  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() !== "";
  }
  
  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
  }

  doSalesReturnOptions = ["", "FR", "PR"];

  doSalesReturnsInfo = {
    columns: ["Ex. Faktur Penjualan"],
    onAdd: function () {
      this.context.ItemsCollection.bind();
      this.data.DOSalesReturns = this.data.DOSalesReturns || [];
      this.data.DOSalesReturns.push({});
    }.bind(this),
    onRemove: function () {
      this.context.ItemsCollection.bind();
    }.bind(this)
  };

  detailOptions = {};

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }
}
