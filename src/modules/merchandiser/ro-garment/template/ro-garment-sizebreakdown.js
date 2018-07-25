import { inject, bindable, BindingEngine, computedFrom } from 'aurelia-framework';
const colorLoader = require('../../../../loader/color-loader');

@inject(BindingEngine)
export class ROGarmentSizeBreakdown {
    controlOptions = {
        control: {
            length: 12
        }
    };

    RO_Garment_SizeBreakdown_DetailsInfo = {
        columns: [
            { header: "Keterangan", value: "Information" },
            { header: "Size", value: "Size" },
            { header: "Quantity", value: "Quantity" },
        ],
        options: { readOnly: this.readOnly },
        onAdd: function () {
            this.data.RO_Garment_SizeBreakdown_Details.push({});
        }.bind(this)
    };

    get colorLoader() {
        return colorLoader;
    }

    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.context = context;
        this.data = this.context.data;
        this.columns = this.context.context.columns;
        this.options = this.context.options;
        this.readOnly = this.options.readOnly;
        this.RO_Garment_SizeBreakdown_DetailsInfo.options.readOnly = this.readOnly;
        this.shown = false;
    }

    get total() {
        this.data.Total = 0;
        if (this.data.RO_Garment_SizeBreakdown_Details) {
            this.data.RO_Garment_SizeBreakdown_Details.forEach(sbd => {
                this.data.Total += sbd.Quantity;
            })
        }
        return this.data.Total;
    }
}