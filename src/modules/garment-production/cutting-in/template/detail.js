import { computedFrom } from "aurelia-framework";

export class Item {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;

        this.readOnly = this.options.readOnly || this.data.IsDisabled;
        this.showOrigin = this.context.context.options.isEdit || this.readOnly;
    }

    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
    }
    
    @computedFrom("context.context.options.FC", "data.CuttingInQuantity")
    get dataPreparingQuantity() {
        this.data.RemainingQuantity = this.data.CuttingInQuantity;

        if (this.showOrigin) {
            this.showOrigin = false;
        } else {
            // let total  = this.data.CuttingInQuantity + this.context.context.options.FC;
            // this.data.PreparingQuantity = total ? this.data.CuttingInQuantity * this.context.context.options.FC : this.data.PreparingRemainingQuantity;
            this.data.PreparingQuantity = this.data.CuttingInQuantity * this.context.context.options.FC || this.data.PreparingRemainingQuantity;
        }

        return this.data.PreparingQuantity;
    }

    set dataPreparingQuantity(value) {
        this.data.PreparingQuantity = value;
    }
}