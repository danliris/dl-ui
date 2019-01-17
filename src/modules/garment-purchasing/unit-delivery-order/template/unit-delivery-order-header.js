import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class UnitDeliveryOrderHeader {
    @bindable checkAll;

    activate(context) {
        this.context = context;
        this.items = context.items;
        this.options = context.options;

        this.readOnly = this.options.readOnly;
    }

    checkAllChanged(value) {
        this.items.filter(item => item.data.IsDisabled === false)
            .forEach(item => {
                item.data.IsSave = (value === true);
            });
    }
}
