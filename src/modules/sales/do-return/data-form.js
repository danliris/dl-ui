import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service } from "./service";

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;

  constructor(service, bindingSignaler, bindingEngine) {
    this.service = service;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() !== "";
  }

  async bind(context) {
    this.context = context;
    this.context._this = this;
    this.data = this.context.data;
    this.error = this.context.error;
  }

  doReturnDetailsInfo = {
    columns: ["No. Faktur Penjualan"],
    onAdd: function () {
      this.context.DOReturnDetailsCollection.bind();
      this.data.DOReturnDetails = this.data.DOReturnDetails || [];
      this.data.DOReturnDetails.push({});
    }.bind(this),
    onRemove: function () {
      this.context.DOReturnDetailsCollection.bind();
    }.bind(this),
  };
  itemOptions = {};

  doReturnTypeOptions = ["", "FR", "PR"];

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }
}
