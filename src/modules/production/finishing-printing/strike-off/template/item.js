import { inject, bindable, computedFrom } from 'aurelia-framework'
var ColorReceiptLoader = require('../../../../../loader/color-receipt-loader');

export class CartItem {
    
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        
        if(this.data.ColorReceipt){
            this.selectedColorReceipt = this.data.ColorReceipt;
        }
    }

    controlOptions = {
        control: {
            length: 12
        }
    };
    colorReceiptColumns = ["Dye Stuff","G/KG"];
    get colorReceiptLoader() {
        return ColorReceiptLoader;
    }

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    @bindable selectedColorReceipt;
    selectedColorReceiptChanged(newValue, oldValue) {
        if (this.selectedColorReceipt && this.selectedColorReceipt.Id) {
            this.data.ColorReceipt = this.selectedColorReceipt;
            
        }
        else {
            this.data.ColorReceipt = {};
        }
    }
}