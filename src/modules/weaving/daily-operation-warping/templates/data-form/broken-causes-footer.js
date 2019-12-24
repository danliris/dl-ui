import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class BrokenCausesFooter {
    activate(context) {
        this.context = context;
    }

    get totalBroken() {
        let totalBroken = 0;
        for (let item of this.context.items) {
            console.log(item);
            if (item.data) {
                totalBroken += item.data.Total ? Number(item.data.Total) : 0;
            }
        }
        return totalBroken;
    }
}