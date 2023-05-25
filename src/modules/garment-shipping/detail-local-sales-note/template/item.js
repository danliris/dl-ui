import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
const UnitLoader = require('../../../../loader/garment-unitsAndsample-loader');
const UomLoader = require('../../../../loader/uom-loader');
import { Service } from '../service';

@inject(Service)
export class Item {
    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get uomLoader() {
        return UomLoader;
    }

    unitView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    uomView = (data) => {
        return `${data.Unit || data.unit || ""}`;
    }
}