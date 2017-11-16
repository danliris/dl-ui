import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";
var moment = require('moment');
var StyleLoader = require('../../../loader/style-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable title;
    @bindable selectedStyle;

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        if (this.data && this.data._id && this.data.styleId) {
            this.selectedStyle = this.data.style;
        }
    }

    get hourCutting(){
        var hours = 0;
        if(this.data && this.data.shCutting && this.data.shCutting > 0)
            hours = this.data.shCutting / 60;
        return hours;
    }

    get hourSewing(){
        var hours = 0;
        if(this.data && this.data.shSewing && this.data.shSewing > 0)
            hours = this.data.shSewing / 60;
        return hours;
    }

    get hourFinishing(){
        var hours = 0;
        if(this.data && this.data.shFinishing && this.data.shFinishing > 0)
            hours = this.data.shFinishing / 60;
        return hours;
    }

    selectedStyleChanged(newValue) {
        if (newValue) {
            this.data.styleId = newValue._id;
        }
        else {
            this.data.styleId = null;
        }
    }

    styleView = (style) => {
        return `${style.code} - ${style.name}`
    }

    get styleLoader() {
        return StyleLoader;
    }
}