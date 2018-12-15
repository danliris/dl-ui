import {bindable, computedFrom} from 'aurelia-framework'

export class PurchaseQuantityCorrectionItem {
    activate(context) {
        this.data = context.data;
        this.options = context.options;
        this.error = context.error;
        this.contextOptions = context.context.options;
        this.readOnly = this.options.readOnly;
        this.isFirst = false;
        if(this.data.Quantities === 0){
            this.readOnly = true;
        }
        console.log(this.context.error);
        // if(this.context.error.Quantity){
        //     this.context.error.Quantity = "";
        // }
    }
    
    @computedFrom("data.Quantity")
    get priceTotal() {
            if(this.isFirst == true){
                this.data.PriceTotalAfter = parseFloat((this.data.Quantity * this.data.PricePerDealUnitAfter).toFixed(2));
            }
            else
            {
                this.isFirst = true;
            }
        return this.data.PriceTotalAfter;
    }

    set priceTotal(value) {
        this.data.PriceTotalAfter = value;
        return this.data.PriceTotalAfter;
    }
}