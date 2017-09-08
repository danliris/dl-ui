import {bindable, computedFrom} from 'aurelia-framework'

export class PriceCorrectionItem {
    activate(context) {
        this.data = context.data;
        this.options = context.options;
        this.error = context.error;
        this.contextOptions = context.context.options;
        this.readOnly = this.options.readOnly;
        this.pricePerUnitReadOnly = this.contextOptions.pricePerUnitReadOnly;
        this.pricePerUnitFirst = this.contextOptions.pricePerUnitFirst;
        this.correction = this.contextOptions.correction;
    }

    @computedFrom("data.pricePerUnit")
    get priceTotal() {
        if(!this.pricePerUnitReadOnly) {
            if(this.correction) {
                if(!this.pricePerUnitFirst)
                    this.data.priceTotal = this.data.quantity * this.data.pricePerUnit;
                else
                    this.pricePerUnitFirst = false;
            }
            else
                this.data.priceTotal = this.data.quantity * this.data.pricePerUnit;
        }
        
        return this.data.priceTotal;
    }

    set priceTotal(value) {
        this.data.priceTotal = value;
        return this.data.priceTotal;
    }
}