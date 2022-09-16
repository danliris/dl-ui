import { computedFrom } from "aurelia-framework";

export class Detail {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.readOnly = context.context.options.readOnly;
        this.isView = context.context.options.isView;
        this.itemOptions=context.context.options;

        console.log(this.itemOptions);
    }
}