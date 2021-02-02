import { computedFrom } from "aurelia-framework";

export class Detail {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
console.log(this.context)
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
    }
}