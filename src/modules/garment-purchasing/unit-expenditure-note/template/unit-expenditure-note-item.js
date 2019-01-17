import { bindable, computedFrom } from 'aurelia-framework'
import { Service } from "../service";
export class UnitDeliveryOrderItem {

  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = this.context.error;		
    this.readOnly = context.options.readOnly;
    this.options = this.context.options;

    this.hasView = this.context.context.options.hasView;
    this.hasEdit = this.context.context.options.hasEdit;
    this.hasCreate = this.context.context.options.hasCreate;
    this.hasEdit = this.context.context.options.hasEdit;
    console.log(this.options);
    this.data.IsSave = true;
  }

  @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }
}