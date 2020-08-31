import { inject, BindingEngine } from 'aurelia-framework';

var COALoader = require('../../../../loader/coa-loader');

@inject(BindingEngine)
export class Item {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;

        this.vbRequestDocumentAmount = context.context.options.vbRequestDocumentAmount
        this.vbType = this.options.vbType;
        
    }

    get coaLoader() {
        return COALoader;
    }

    get total() {
        var result = this.data.Amount;
        if (this.data.UseVat)
            result += result * 0.1
        return result;
    }
}
