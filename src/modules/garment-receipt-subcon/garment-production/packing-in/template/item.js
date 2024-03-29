import { bindable, computedFrom } from "aurelia-framework";
import { Service } from "../service";
export class Item {
  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = this.context.error;
    this.options = this.context.options;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() != "";
  }

  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.reduce(
      (acc, curr) => acc && curr.data.IsSave,
      true
    );
  }

  qtyChanged(e) {
    this.data.RemainingQuantity = e.srcElement.value;
    this.data.Price =
      (this.data.BasicPrice + (this.data.ComodityPrice * 25) / 100) *
      this.data.RemainingQuantity;
  }
}
