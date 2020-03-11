import { inject, bindable } from "aurelia-framework";

export class LocalItem {
    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
    }
}
