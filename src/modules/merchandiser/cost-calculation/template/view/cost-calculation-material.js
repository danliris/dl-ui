import { inject, bindable, computedFrom } from 'aurelia-framework';
import numeral from 'numeral';
const defaultNumberFormat = "0,0.00";

export class CostCalculationMaterial {

    controlOptions = {
        control: {
            length: 12
        }
    };

    async activate(context) {
        this.context = context;
        this.data = this.context.data;
        this.options = this.context.options;
        this.readOnly = true;
        this.data.Category.FullName = this.data.Category.SubCategory ? this.data.Category.Name + " - " + this.data.Category.SubCategory : this.data.Category.Name;
        this.data.QuantityInUnit = numeral(this.data.Quantity).format(defaultNumberFormat) + " " + this.data.UOMQuantity.unit;
        this.data.PricePerUnit = numeral(this.data.Price).format(defaultNumberFormat) + " / " + this.data.UOMPrice.unit;
        this.data.Total = numeral(this.data.Total).format(defaultNumberFormat);
    }
}
