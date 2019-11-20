import {bindable, computedFrom} from 'aurelia-framework'

export class GarmentDeliveryReturnItem {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.options = context.context.options;
        this.error = context.error;
        this.contextOptions = context.context.options;

        if (this.options.returnType === "RETUR") {
            this.readOnly = true;
        }
    }

    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
      }
}