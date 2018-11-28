import {bindable, computedFrom} from 'aurelia-framework'

export class PurchaseQuantityCorrectionItem {
    activate(context) {
        this.data = context.data;
        this.options = context.options;
        this.error = context.error;
        this.contextOptions = context.context.options;
        this.readOnly = this.options.readOnly;
    }

    @computedFrom("data.Quantity")
    get priceTotal() {
                
        this.data.PriceTotalAfter = parseFloat((this.data.Quantity * this.data.PricePerDealUnitAfter).toFixed(2));
        
        return this.data.PriceTotalAfter;
    }

    set priceTotal(value) {
        this.data.PriceTotalAfter = value;
        return this.data.PriceTotalAfter;
    }
}